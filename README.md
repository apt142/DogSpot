DogSpot
=======

Dog Spotting Software



Data Model:

User
    id
    first_name
    last_name
    username // Use Email instead?  Use G+ or Facebook?
    password
    phone
    email
    account_type  // Free User/Paid Account?  Add more features for a paid account?
    type_expiration

Location
    id
    address 1
    address 2
    city
    state
    zip
    longitude
    latitude
    status

dog
    id
    user_id
    name
    location_id
    status (lost, found, ??)
    description
    distinguishing_marks  // Separate from description


// Dog Characteristics can be varied and some could apply to some breeds but not others.
// Also, people's recollections are varied and not all details of a dog will be
// Remembered or accounted for.  So, the model has to allow for partial or missing information.
// Also the model needs to allow for heuristic evaluation of matches based on partial data
// and it must be able to do such math efficiently.  IDs help with that.  Some discussion required.
dog_characteristic
    dog_id
    characteristic_id

characteristic (contains size(tiny, small, medium, large), breed(s), color, weight)
    id
    characteristic
    category_id
    description

category  (Necessary?  Or group by on the char table?)
    id
    category

// Pictures of a dog
images
    id
    dog_id
    src
    primary (bool)
    status



Framework suggestions:
Front End:
Backbone.js + Marrionette js

Back End:
Small site: SlimPHP + Laravel ORM
Large Site: Silex, Symfony


Other Tech:
    Composer

