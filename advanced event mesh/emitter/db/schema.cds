namespace gcoe;

entity Toys {
    key ID    : UUID   @title: 'ID';
        Name  : String @title: 'Item';
        Owner : String @title: 'Owner Name';
};
