namespace gcoe;

using gcoe as my from '../db/schema';

service EmitterService {

    entity Toys as projection on my.Toys actions {
        action changeOwner(newOwner : String @mandatory @title : 'New owner' ) returns Toys;
    };

    event ownerChanged : {
        Toy   : String;
        Owner : String;
    };

}
