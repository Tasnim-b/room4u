import django_filters
from .models import AnnonceProprietaire, AnnonceColcChercheur,AnnonceColocProposeur

class AnnonceProprietaireFilter(django_filters.FilterSet):
    loyer_min = django_filters.NumberFilter(field_name='loyer', lookup_expr='gte')
    loyer_max = django_filters.NumberFilter(field_name='loyer', lookup_expr='lte')
    gouvernorat = django_filters.CharFilter(lookup_expr='icontains')
    delegation = django_filters.CharFilter(lookup_expr='icontains')
    type_de_logement = django_filters.CharFilter(lookup_expr='icontains')
    meuble = django_filters.CharFilter()
    colocataire_déjà_existant = django_filters.NumberFilter()
    date_de_disponibilite = django_filters.DateFilter(lookup_expr='gte')
    commodites = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = AnnonceProprietaire
        fields = [
            'gouvernorat', 'delegation', 'type_de_logement',
            'meuble', 'colocataire_déjà_existant', 'date_de_disponibilite', 'commodites'
        ]

class AnnonceColcChercheurFilter(django_filters.FilterSet):
    budget_max = django_filters.NumberFilter(field_name='budget_max', lookup_expr='lte')
    age_min = django_filters.NumberFilter(field_name='age', lookup_expr='gte')
    age_max = django_filters.NumberFilter(field_name='age', lookup_expr='lte')
    gouvernorat = django_filters.CharFilter(lookup_expr='icontains')
    delegation = django_filters.CharFilter(lookup_expr='icontains')
    occupation = django_filters.CharFilter(lookup_expr='icontains')
    preferences = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = AnnonceColcChercheur
        fields = [
            'gouvernorat', 'delegation', 'occupation',
            'budget_max', 'age_min', 'age_max', 'preferences'
        ]


class AnnonceColocProposeurFilter(django_filters.FilterSet):
    loyer_min = django_filters.NumberFilter(field_name='loyer', lookup_expr='gte')
    loyer_max = django_filters.NumberFilter(field_name='loyer', lookup_expr='lte')
    caution_max = django_filters.NumberFilter(field_name='caution', lookup_expr='lte')
    gouvernorat = django_filters.CharFilter(lookup_expr='icontains')
    delegation = django_filters.CharFilter(lookup_expr='icontains')
    date_de_disponibilite = django_filters.DateFilter(lookup_expr='gte')

    class Meta:
        model = AnnonceColocProposeur
        fields = [
            'gouvernorat', 'delegation', 'loyer_min',
            'loyer_max', 'caution_max', 'date_de_disponibilite'
        ]