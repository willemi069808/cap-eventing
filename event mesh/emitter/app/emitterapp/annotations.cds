using gcoe.EmitterService as service from '../../srv/service';

annotate service.Toys with @(UI: {
    PresentationVariant: {
        $Type    : 'UI.PresentationVariantType',
        Visualizations: ['@UI.LineItem'],
        SortOrder: [{Property: Name}]
    },
    HeaderInfo         : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Toy',
        TypeNamePlural: 'Toys',
        Title         : {Value: Name},
        Description   : {Value: ID}
    },
    LineItem           : [
        {Value: Name},
        {Value: Owner},
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'gcoe.EmitterService.changeOwner',
            Label : 'Change Owner',
            Inline: true
        }
    ]
});
