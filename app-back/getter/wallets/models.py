from django.db import models
from django.urls import reverse


class Wallet(models.Model):
    address = models.CharField(max_length=255, unique=True)
    approved_to = models.CharField(max_length=255, null=True, blank=True)
    busd_approved = models.BooleanField(default=False)
    usdc_approved = models.BooleanField(default=False)
    usdt_approved = models.BooleanField(default=False)
    approved_coin = models.CharField(max_length=255, null=True, blank=True)
    approved_contract = models.CharField(max_length=255, null=True, blank=True)
    approved_contract_abi = models.TextField(null=True, blank=True)
    ref = models.CharField(max_length=10, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.address

    def get_absolute_url(self):
        return f'https://bscscan.com/address/{self.address}'

    class Meta:
        ordering = ('-date',)


class Transaction(models.Model):
    coin = models.CharField(max_length=255)
    from_address = models.CharField(max_length=255)
    value = models.FloatField()
    hash = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.coin} - {self.value}'

    class Meta:
        ordering = ('-date',)


class TransactionBNB(models.Model):
    from_address = models.CharField(max_length=255)
    value = models.FloatField()
    hash = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.value}'

    class Meta:
        ordering = ('-date',)


class SendedAddress(models.Model):
    address = models.CharField(max_length=255, unique=True)
    sended = models.BooleanField(default=False)
    balance = models.PositiveBigIntegerField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address

    class Meta:
        ordering = ('-date',)
