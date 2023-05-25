namespace gcoe;

entity Toys {
    key ID      : UUID   @title: 'ID';
        Name    : String @title: 'Item';
        Owner   : String @title: 'Owner Name';
        Changes : Composition of many Changes
                      on Changes.Toy = $self;
};

entity Changes {
    key ID        : UUID                  @title: 'ID'  @Core.Computed;
        Timestamp : DateTime default $now @title: 'Timestamp';
        Data      : String                @title: 'Event';
        Toy       : Association to one Toys;
}
