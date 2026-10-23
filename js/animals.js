/*
  ANIMAL LIST
  -----------
  One entry per animal. To add an animal, copy a line, change the values, and add a
  picture to images/animals/ named after the id. Every answer must be technically correct.

  Fields and allowed values
    name:       simple name shown in the app      species: the species the data and picture are based on
    group:      'zoo' | 'australia' | 'canada'
    kind:       'mammal' | 'bird' | 'reptile' | 'amphibian' | 'fish'
    body:       list of 'fur' | 'feathers' | 'scales' | 'skin' | 'spines'
    legs:       number of legs                     other: other limbs, e.g. '2 arms', '2 wings', '2 flippers', 'fins', or ''
    flies:      true | false                       swims: true if it swims at least sometimes in the wild
    habitats:   list of 'ocean' | 'rainforest' | 'forest' | 'grassland' | 'desert' | 'mountains' | 'snow' | 'river' | 'wetland'
                ('snow' = cold and snowy places, 'river' = river or lake)
    regions:    list of 'africa' | 'asia' | 'europe' | 'northAmerica' | 'southAmerica' | 'australia' | 'antarctica' | 'arctic' | 'ocean'
                (native wild range only)
    diet:       'plants' | 'meat' | 'both'         food: main foods, as a list
    size:       1 cat | 2 dog | 3 you | 4 grown-up (adult-sized up to car-sized) | 5 car (car-sized or bigger)
    metres:     typical adult size, short, e.g. '2.7 m long' or '10 cm long'
    colours:    one or two of 'brown' | 'grey' | 'black' | 'white' | 'yellow' | 'orange' | 'pink' | 'green' | 'red' | 'blue'
    features:   any of 'stripes' | 'spots' | 'mane' | 'horns' | 'antlers' | 'tusk' | 'trunk' | 'pouch' | 'longNeck' | 'frill' | 'beak' | 'eggs'
    fact:       one fun fact, written with "it" instead of the name (it is read aloud)

  Real photos for the browse grids are listed in PHOTOS at the bottom of this file.
*/
window.ANIMALS = [
  // Zoo favourites
  { id: 'lion', name: 'Lion', species: 'Lion', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['grassland'], regions: ['africa', 'asia'], diet: 'meat', food: ['zebras', 'wildebeest', 'buffalo'], size: 4, metres: '2.7 m long', colours: ['yellow'], features: ['mane'], fact: 'Its roar can be heard up to 8 km away.' },
  { id: 'tiger', name: 'Tiger', species: 'Bengal tiger', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest', 'wetland'], regions: ['asia'], diet: 'meat', food: ['deer', 'wild pigs'], size: 4, metres: '2.8 m long', colours: ['orange', 'black'], features: ['stripes'], fact: 'Its skin is striped too, not just its fur.' },
  { id: 'elephant', name: 'Elephant', species: 'African bush elephant', group: 'zoo', kind: 'mammal', body: ['skin'], legs: 4, other: '', flies: false, swims: true, habitats: ['grassland', 'forest'], regions: ['africa'], diet: 'plants', food: ['grass', 'leaves', 'bark'], size: 5, metres: '3 m tall', colours: ['grey'], features: ['trunk', 'tusk'], fact: 'When it swims, it uses its trunk like a snorkel.' },
  { id: 'giraffe', name: 'Giraffe', species: 'Giraffe', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: false, habitats: ['grassland'], regions: ['africa'], diet: 'plants', food: ['acacia leaves'], size: 5, metres: '5 m tall', colours: ['yellow', 'brown'], features: ['longNeck', 'spots', 'mane'], fact: 'Its tongue is dark purple and about 50 cm long.' },
  { id: 'zebra', name: 'Zebra', species: 'Plains zebra', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['grassland'], regions: ['africa'], diet: 'plants', food: ['grass'], size: 4, metres: '2.3 m long', colours: ['black', 'white'], features: ['stripes', 'mane'], fact: 'Under its stripes, its skin is black.' },
  { id: 'monkey', name: 'Monkey', species: 'Spider monkey', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 2, other: '2 arms', flies: false, swims: false, habitats: ['rainforest'], regions: ['northAmerica', 'southAmerica'], diet: 'plants', food: ['fruit'], size: 2, metres: '1.3 m long', colours: ['brown'], features: [], fact: 'It can hang from a branch by its tail alone.' },
  { id: 'gorilla', name: 'Gorilla', species: 'Western lowland gorilla', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 2, other: '2 arms', flies: false, swims: false, habitats: ['rainforest'], regions: ['africa'], diet: 'plants', food: ['leaves', 'stems', 'fruit'], size: 4, metres: '1.6 m tall', colours: ['black'], features: [], fact: 'It makes a new bed of leaves every night.' },
  { id: 'hippo', name: 'Hippo', species: 'Common hippopotamus', group: 'zoo', kind: 'mammal', body: ['skin'], legs: 4, other: '', flies: false, swims: false, habitats: ['river', 'grassland'], regions: ['africa'], diet: 'plants', food: ['grass'], size: 5, metres: '3.5 m long', colours: ['grey'], features: ['tusk'], fact: "It can't really swim. It walks and bounces along the river bottom." },
  { id: 'rhino', name: 'Rhino', species: 'White rhinoceros', group: 'zoo', kind: 'mammal', body: ['skin'], legs: 4, other: '', flies: false, swims: true, habitats: ['grassland'], regions: ['africa'], diet: 'plants', food: ['grass'], size: 5, metres: '3.8 m long', colours: ['grey'], features: ['horns'], fact: 'Its horns are made of keratin, like your fingernails.' },
  { id: 'brown-bear', name: 'Brown Bear', species: 'Brown bear', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest', 'mountains'], regions: ['northAmerica', 'europe', 'asia'], diet: 'both', food: ['berries', 'roots', 'fish'], size: 4, metres: '2 m long', colours: ['brown'], features: [], fact: 'It can run about 50 km/h, as fast as a car in town.' },
  { id: 'giant-panda', name: 'Giant Panda', species: 'Giant panda', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest', 'mountains'], regions: ['asia'], diet: 'plants', food: ['bamboo'], size: 4, metres: '1.5 m long', colours: ['black', 'white'], features: [], fact: 'A newborn is pink and weighs about 100 grams, less than an apple.' },
  { id: 'penguin', name: 'Penguin', species: 'Emperor penguin', group: 'zoo', kind: 'bird', body: ['feathers'], legs: 2, other: '2 wings', flies: false, swims: true, habitats: ['snow', 'ocean'], regions: ['antarctica', 'ocean'], diet: 'meat', food: ['fish', 'krill', 'squid'], size: 3, metres: '1.1 m tall', colours: ['black', 'white'], features: ['beak', 'eggs'], fact: 'The dad keeps the egg warm on his feet for about two months.' },
  { id: 'crocodile', name: 'Crocodile', species: 'Saltwater crocodile', group: 'zoo', kind: 'reptile', body: ['scales'], legs: 4, other: '', flies: false, swims: true, habitats: ['river', 'wetland', 'ocean'], regions: ['asia', 'australia'], diet: 'meat', food: ['fish', 'birds', 'mammals'], size: 5, metres: '4 m long', colours: ['green'], features: ['eggs'], fact: 'It is the biggest reptile in the world.' },
  { id: 'snake', name: 'Snake', species: 'Green tree python', group: 'zoo', kind: 'reptile', body: ['scales'], legs: 0, other: '', flies: false, swims: false, habitats: ['rainforest'], regions: ['australia'], diet: 'meat', food: ['rats', 'mice'], size: 1, metres: '1.6 m long', colours: ['green'], features: ['eggs'], fact: 'Babies are bright yellow or red and turn green as they grow.' },
  { id: 'flamingo', name: 'Flamingo', species: 'American flamingo', group: 'zoo', kind: 'bird', body: ['feathers'], legs: 2, other: '2 wings', flies: true, swims: true, habitats: ['wetland'], regions: ['northAmerica', 'southAmerica'], diet: 'both', food: ['shrimp', 'algae'], size: 3, metres: '1.3 m tall', colours: ['pink'], features: ['longNeck', 'beak', 'eggs'], fact: "It's pink because of the shrimp and algae it eats." },
  { id: 'owl', name: 'Owl', species: 'Snowy owl', group: 'zoo', kind: 'bird', body: ['feathers'], legs: 2, other: '2 wings', flies: true, swims: false, habitats: ['snow', 'grassland'], regions: ['arctic', 'northAmerica', 'europe', 'asia'], diet: 'meat', food: ['lemmings'], size: 1, metres: '0.6 m tall', colours: ['white'], features: ['beak', 'eggs'], fact: 'In winter, some fly south to fields around cities like Toronto.' },
  { id: 'cheetah', name: 'Cheetah', species: 'Cheetah', group: 'zoo', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['grassland'], regions: ['africa', 'asia'], diet: 'meat', food: ['gazelles', 'impalas'], size: 4, metres: '2 m long', colours: ['yellow'], features: ['spots'], fact: "It's the fastest land animal, reaching about 100 km/h." },
  { id: 'parrot', name: 'Parrot', species: 'Scarlet macaw', group: 'zoo', kind: 'bird', body: ['feathers'], legs: 2, other: '2 wings', flies: true, swims: false, habitats: ['rainforest'], regions: ['northAmerica', 'southAmerica'], diet: 'plants', food: ['nuts', 'seeds', 'fruit'], size: 1, metres: '0.85 m long', colours: ['red', 'blue'], features: ['beak', 'eggs'], fact: 'It eats clay from riverbanks.' },
  { id: 'shark', name: 'Shark', species: 'Great white shark', group: 'zoo', kind: 'fish', body: ['scales'], legs: 0, other: 'fins', flies: false, swims: true, habitats: ['ocean'], regions: ['ocean'], diet: 'meat', food: ['seals', 'fish'], size: 5, metres: '4.5 m long', colours: ['grey', 'white'], features: [], fact: 'It has about 300 teeth and grows new ones all its life.' },
  { id: 'dolphin', name: 'Dolphin', species: 'Bottlenose dolphin', group: 'zoo', kind: 'mammal', body: ['skin'], legs: 0, other: '2 flippers', flies: false, swims: true, habitats: ['ocean'], regions: ['ocean'], diet: 'meat', food: ['fish', 'squid'], size: 4, metres: '2.5 m long', colours: ['grey'], features: [], fact: 'Each one has its own whistle, like a name.' },

  // Australian animals
  { id: 'kangaroo', name: 'Kangaroo', species: 'Red kangaroo', group: 'australia', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['grassland', 'desert'], regions: ['australia'], diet: 'plants', food: ['grass'], size: 4, metres: '1.5 m tall', colours: ['brown'], features: ['pouch'], fact: "It's a good swimmer and kicks its legs one at a time in water." },
  { id: 'koala', name: 'Koala', species: 'Koala', group: 'australia', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest'], regions: ['australia'], diet: 'plants', food: ['eucalyptus leaves'], size: 2, metres: '0.75 m long', colours: ['grey'], features: ['pouch'], fact: 'It sleeps up to 20 hours a day, and it can swim.' },
  { id: 'wombat', name: 'Wombat', species: 'Common wombat', group: 'australia', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest', 'mountains'], regions: ['australia'], diet: 'plants', food: ['grass', 'roots'], size: 2, metres: '1 m long', colours: ['brown'], features: ['pouch'], fact: 'Its poop is shaped like cubes.' },
  { id: 'platypus', name: 'Platypus', species: 'Platypus', group: 'australia', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['river'], regions: ['australia'], diet: 'meat', food: ['insect larvae', 'worms', 'shrimp'], size: 1, metres: '0.5 m long', colours: ['brown'], features: ['beak', 'eggs'], fact: 'It closes its eyes underwater and finds food by sensing tiny electric signals with its bill.' },
  { id: 'emu', name: 'Emu', species: 'Emu', group: 'australia', kind: 'bird', body: ['feathers'], legs: 2, other: '2 wings', flies: false, swims: true, habitats: ['grassland', 'forest'], regions: ['australia'], diet: 'both', food: ['fruit', 'seeds', 'insects'], size: 4, metres: '1.7 m tall', colours: ['brown'], features: ['longNeck', 'beak', 'eggs'], fact: "It can't fly, but it can run fast and swim." },
  { id: 'echidna', name: 'Echidna', species: 'Short-beaked echidna', group: 'australia', kind: 'mammal', body: ['fur', 'spines'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest', 'grassland', 'desert'], regions: ['australia'], diet: 'meat', food: ['ants', 'termites'], size: 1, metres: '0.4 m long', colours: ['brown'], features: ['eggs', 'pouch'], fact: 'It swims with its snout poking out like a snorkel.' },
  { id: 'tasmanian-devil', name: 'Tasmanian Devil', species: 'Tasmanian devil', group: 'australia', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest'], regions: ['australia'], diet: 'meat', food: ['dead animals', 'small mammals', 'birds'], size: 2, metres: '0.9 m long', colours: ['black'], features: ['pouch'], fact: 'It eats its food whole, bones and all.' },
  { id: 'wallaby', name: 'Wallaby', species: 'Red-necked wallaby', group: 'australia', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest'], regions: ['australia'], diet: 'plants', food: ['grass', 'leaves'], size: 2, metres: '0.8 m tall', colours: ['grey', 'red'], features: ['pouch'], fact: 'Its neck and shoulders have reddish fur.' },
  { id: 'kookaburra', name: 'Kookaburra', species: 'Laughing kookaburra', group: 'australia', kind: 'bird', body: ['feathers'], legs: 2, other: '2 wings', flies: true, swims: false, habitats: ['forest'], regions: ['australia'], diet: 'meat', food: ['insects', 'lizards', 'snakes', 'mice'], size: 1, metres: '0.4 m long', colours: ['brown', 'white'], features: ['beak', 'eggs'], fact: 'Its call sounds like loud laughing.' },
  { id: 'cockatoo', name: 'Cockatoo', species: 'Sulphur-crested cockatoo', group: 'australia', kind: 'bird', body: ['feathers'], legs: 2, other: '2 wings', flies: true, swims: false, habitats: ['forest'], regions: ['australia'], diet: 'plants', food: ['seeds', 'nuts', 'roots'], size: 1, metres: '0.5 m long', colours: ['white', 'yellow'], features: ['beak', 'eggs'], fact: 'In cities, it has learned to open garbage bins to find food.' },
  { id: 'quokka', name: 'Quokka', species: 'Quokka', group: 'australia', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: false, habitats: ['forest', 'wetland'], regions: ['australia'], diet: 'plants', food: ['leaves', 'grass'], size: 1, metres: '0.5 m long', colours: ['brown'], features: ['pouch'], fact: 'Most live on one small island near Perth, called Rottnest Island.' },
  { id: 'dingo', name: 'Dingo', species: 'Dingo', group: 'australia', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['desert', 'grassland', 'forest'], regions: ['australia'], diet: 'meat', food: ['kangaroos', 'rabbits', 'rodents'], size: 2, metres: '0.55 m tall', colours: ['orange'], features: [], fact: 'It almost never barks. It howls instead.' },
  { id: 'frill-necked-lizard', name: 'Frill-necked Lizard', species: 'Frill-necked lizard', group: 'australia', kind: 'reptile', body: ['scales'], legs: 4, other: '', flies: false, swims: false, habitats: ['forest'], regions: ['australia'], diet: 'meat', food: ['insects', 'termites', 'ants'], size: 1, metres: '0.9 m long', colours: ['brown', 'orange'], features: ['frill', 'eggs'], fact: 'When scared, it opens its frill, hisses, and runs away on its back legs.' },
  { id: 'frog', name: 'Green Tree Frog', species: 'Australian green tree frog', group: 'australia', kind: 'amphibian', body: ['skin'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest', 'wetland'], regions: ['australia'], diet: 'meat', food: ['insects', 'spiders'], size: 1, metres: '10 cm long', colours: ['green'], features: ['eggs'], fact: "It sometimes lives in toilets and drainpipes in people's houses." },

  // Canadian animals
  { id: 'moose', name: 'Moose', species: 'Moose', group: 'canada', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest', 'wetland', 'river'], regions: ['northAmerica', 'europe', 'asia'], diet: 'plants', food: ['leaves', 'twigs', 'water plants'], size: 4, metres: '1.9 m tall', colours: ['brown'], features: ['antlers'], fact: "It's a great swimmer and can dive underwater to eat plants." },
  { id: 'beaver', name: 'Beaver', species: 'North American beaver', group: 'canada', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['river', 'forest'], regions: ['northAmerica'], diet: 'plants', food: ['bark', 'leaves', 'water plants'], size: 2, metres: '1.1 m long', colours: ['brown'], features: [], fact: 'Its front teeth are orange because they contain iron.' },
  { id: 'polar-bear', name: 'Polar Bear', species: 'Polar bear', group: 'canada', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['snow', 'ocean'], regions: ['arctic', 'northAmerica', 'europe', 'asia'], diet: 'meat', food: ['seals'], size: 4, metres: '2.2 m long', colours: ['white'], features: [], fact: 'Its skin is black under its white fur.' },
  { id: 'loon', name: 'Loon', species: 'Common loon', group: 'canada', kind: 'bird', body: ['feathers'], legs: 2, other: '2 wings', flies: true, swims: true, habitats: ['river', 'ocean'], regions: ['northAmerica', 'europe'], diet: 'meat', food: ['fish'], size: 1, metres: '0.8 m long', colours: ['black', 'white'], features: ['beak', 'eggs'], fact: "It's on Canada's one-dollar coin." },
  { id: 'caribou', name: 'Caribou', species: 'Caribou', group: 'canada', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['snow', 'forest'], regions: ['arctic', 'northAmerica', 'europe', 'asia'], diet: 'plants', food: ['lichen'], size: 4, metres: '1.2 m tall', colours: ['brown', 'white'], features: ['antlers'], fact: 'Both boys and girls grow antlers.' },
  { id: 'raccoon', name: 'Raccoon', species: 'Raccoon', group: 'canada', kind: 'mammal', body: ['fur'], legs: 4, other: '', flies: false, swims: true, habitats: ['forest', 'river'], regions: ['northAmerica'], diet: 'both', food: ['fruit', 'nuts', 'insects', 'crayfish'], size: 2, metres: '0.8 m long', colours: ['grey'], features: ['stripes'], fact: 'It often feels its food with its hands in water before eating.' },
  { id: 'narwhal', name: 'Narwhal', species: 'Narwhal', group: 'canada', kind: 'mammal', body: ['skin'], legs: 0, other: '2 flippers', flies: false, swims: true, habitats: ['ocean', 'snow'], regions: ['arctic', 'ocean'], diet: 'meat', food: ['fish', 'squid', 'shrimp'], size: 5, metres: '4.5 m long', colours: ['grey'], features: ['tusk'], fact: 'Its long tusk is a tooth that grows through its lip.' }
];

/*
  PHOTOS (browse grids)
  Each value is a file name on Wikimedia Commons (https://commons.wikimedia.org).
  To change a photo, find a better one on Commons and paste its file name here, without "File:".
  The photographer and licence for each photo are shown on the Photo credits screen.
  If a photo can't load (no internet, or a wrong name), the drawing is shown instead.
*/
window.PHOTOS = {
  'lion': 'Lion waiting in Namibia.jpg',
  'tiger': 'Walking tiger female.jpg',
  'elephant': 'African Bush Elephant.jpg',
  'giraffe': 'Giraffa camelopardalis angolensis.jpg',
  'zebra': 'Equus quagga (Namutoni, 2012).jpg',
  'monkey': "Geoffroy's spider monkey (Ateles geoffroyi yucatanensis) Peten 2.jpg",
  'gorilla': 'Western Lowland Gorilla.jpg',
  'hippo': 'Hipopótamo (Hippopotamus amphibius), parque nacional de Chobe, Botsuana, 2018-07-28, DD 82.jpg',
  'rhino': 'White rhinoceros or square-lipped rhinoceros, Ceratotherium simum. (17163409510).jpg',
  'brown-bear': 'Brown bear (Ursus arctos arctos) running.jpg',
  'giant-panda': 'Giant Panda eating Bamboo.JPG',
  'penguin': 'Aptenodytes forsteri -Snow Hill Island, Antarctica -adults and juvenile-8.jpg',
  'crocodile': 'Saltwater crocodile (Crocodylus porosus), Gembira Loka Zoo, 2015-03-15 03.jpg',
  'snake': 'Green Tree Python Coiled Around a Branch.jpg',
  'flamingo': 'Phoenicopterus ruber standing on one leg.jpg',
  'owl': 'Bubo scandiacus (Linnaeus, 1758) Male.jpg',
  'cheetah': 'Cheetah (Acinonyx jubatus) female 2.jpg',
  'parrot': 'Scarlet macaws (Ara macao macao) pair Yasuni.jpg',
  'shark': 'Great white shark south africa.jpg',
  'dolphin': 'Tursiops truncatus 01.jpg',
  'kangaroo': 'Red-Kangaroo.jpg',
  'koala': 'Koala climbing tree.jpg',
  'wombat': 'Vombatus ursinus -Maria Island National Park.jpg',
  'platypus': 'Duck-billed platypus (Ornithorhynchus anatinus) Scottsdale 4.jpg',
  'emu': 'Emu (Dromaeus novae hollandiae).jpg',
  'echidna': 'Wild shortbeak echidna.jpg',
  'tasmanian-devil': 'Sarcophilus harrisii taranna.jpg',
  'wallaby': 'Macropus rufogriseus rufogriseus Bruny.jpg',
  'kookaburra': 'Laughing Kookaburra - male.jpg',
  'cockatoo': 'Cacatua galerita -balcony -Sydney -Australia-8a.jpg',
  'quokka': 'Quokka sonriendo.jpg',
  'dingo': 'Canis lupus dingo -Healesville Sanctuary, Victoria, Australia-8a.jpg',
  'frill-necked-lizard': 'Frill-necked Lizard (Chlamydosaurus kingii) (8691487073).jpg',
  'frog': 'Australia green tree frog (Litoria caerulea) crop.jpg',
  'moose': 'Bigbullmoose.jpg',
  'beaver': 'North American Beaver (Castor canadensis) - Algonquin Provincial Park, Ontario 01.jpg',
  'polar-bear': 'Polar Bear - Alaska.jpg',
  'loon': 'Common Loon in Maine RWD.jpg',
  'caribou': 'Woodland Caribou, Newfoundland.jpg',
  'raccoon': 'Raccoon (Procyon lotor) 2.jpg',
  'narwhal': 'Pod Monodon monoceros.jpg'
};

/*
  PICTURES (cartoon drawings)
  Set IMAGE_TYPE to 'png' once your Gemini pictures are saved as images/animals/<id>.png.
  To swap just a few, list them in IMAGE_OVERRIDES, e.g. { koala: 'images/animals/koala.png' }.
*/
window.IMAGE_TYPE = 'svg';
window.IMAGE_OVERRIDES = {};

window.ANIMALS.forEach(function (a) {
  a.image = window.IMAGE_OVERRIDES[a.id] || ('images/animals/' + a.id + '.' + window.IMAGE_TYPE);
  if (!a.photo && window.PHOTOS[a.id]) a.photo = window.PHOTOS[a.id];
});
