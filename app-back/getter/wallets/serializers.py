from rest_framework import serializers
from . import models


class WalletSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Wallet
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Transaction
        fields = '__all__'


class TransactionBNBSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.TransactionBNB
        fields = '__all__'


class SendedaddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.SendedAddress
        fields = '__all__'
