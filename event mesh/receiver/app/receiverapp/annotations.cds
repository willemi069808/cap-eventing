using gcoe.ReceiverService as service from '../../srv/service';

annotate service.Changes with @(UI: {
    PresentationVariant: {
        $Type    : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem'],
        SortOrder: [{
            Property  : Timestamp,
            Descending: true
        }]
    },
    HeaderInfo         : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Toy',
        TypeNamePlural: 'Toys'
    },
    LineItem           : [
        {Value: Name},
        {Value: Timestamp},
        {Value: Data}
    ]
});
