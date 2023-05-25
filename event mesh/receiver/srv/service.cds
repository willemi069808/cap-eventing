namespace gcoe;

using gcoe as my from '../db/schema';

service ReceiverService {
    entity Changes as projection on my.Changes {
        Toy.Name,
        Timestamp,
        Data
    };
};
