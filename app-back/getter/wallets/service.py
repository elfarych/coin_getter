from django_filters import rest_framework as filters
from . import models


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class WalletFilter(filters.FilterSet):
    address = CharFilterInFilter(field_name='address')
    approved_to = CharFilterInFilter(field_name='approved_to')

    class Meta:
        model = models.Wallet
        fields = ['address', 'approved_to']

