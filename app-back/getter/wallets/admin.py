from django.contrib import admin

from . import models


@admin.register(models.Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('address', 'busd_approved', 'usdc_approved', 'usdt_approved', 'date')
    search_fields = ('address',)
    list_filter = ('ref', 'busd_approved', 'usdc_approved', 'usdt_approved',  'date')


@admin.register(models.Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('coin', 'value', 'hash', 'date')
    search_fields = ('from_address', 'hash')
    list_filter = ('date',)


@admin.register(models.TransactionBNB)
class TransactionBNBAdmin(admin.ModelAdmin):
    list_display = ('value', 'hash', 'date')
    search_fields = ('from_address', 'hash')
    list_filter = ('date',)
    

@admin.register(models.SendedAddress)
class SendedAddressAdmin(admin.ModelAdmin):
    list_display = ('address', 'sended', 'date')
    search_fields = ('address',)
    ordering = ('-date',)