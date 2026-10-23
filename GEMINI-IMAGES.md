# Making the animal pictures in Gemini

The app has a cartoon drawing for each of the 41 animals. These are placeholders you can replace with Gemini pictures.

## 1. Style sentence (use the same one every time)

Paste this, then the animal line from the list below:

> Cute cartoon illustration for a children's picture book. Simple, friendly style with thick dark brown outlines, soft flat colours and big friendly eyes. Full body, centred, with space around it. Plain white background. Accurate colours and body features for the real species. No text, no other animals. Square image.

Tips for a matching set:
- Make all 41 in one Gemini chat so the style stays consistent.
- When you get one you love, upload it in later prompts and add: "Match the style of this picture exactly."
- Check each picture against the animal's card in the app (colours, legs, special features). The data is accurate, so the picture should agree with it.

## 2. Animal lines

| File name | Animal line to paste after the style sentence |
|---|---|
| lion.png | An adult male African lion with a full golden-brown mane and tawny yellow fur. |
| tiger.png | A Bengal tiger: orange fur with black stripes, white chest and cheeks. |
| elephant.png | An African bush elephant with very large ears, two ivory tusks and wrinkly grey skin. |
| giraffe.png | A giraffe with a long neck, brown patches on yellow fur, two short knobbly ossicones and a short mane. |
| zebra.png | A plains zebra with black and white stripes and a short upright mane. |
| monkey.png | A Geoffroy's spider monkey with long thin arms and legs, brown fur, black hands and a very long tail curled around a branch. |
| gorilla.png | A western lowland gorilla with black fur, standing on its knuckles. |
| hippo.png | A common hippo with grey skin, mouth slightly open to show two tusks. |
| rhino.png | A white rhinoceros with grey skin, two horns and a wide square mouth. |
| brown-bear.png | A brown bear on four legs with a shoulder hump. |
| giant-panda.png | A giant panda sitting and holding bamboo. |
| penguin.png | An emperor penguin: black back, white belly, yellow-orange patches by its ears. |
| crocodile.png | A saltwater crocodile, olive green, long snout, side view. |
| snake.png | A bright green tree python coiled over a branch. |
| flamingo.png | An American flamingo, bright pink, standing on one leg, bent beak with a black tip. |
| owl.png | A snowy owl: white feathers with small dark flecks and yellow eyes. |
| cheetah.png | A slim cheetah with yellow fur, solid black spots and black tear lines down its face. |
| parrot.png | A scarlet macaw: red body, yellow and blue wings, long red and blue tail. |
| shark.png | A great white shark: grey back, white belly, side view. |
| dolphin.png | A grey bottlenose dolphin, side view. |
| kangaroo.png | A big red kangaroo with red-brown fur, standing tall on long back legs with a thick tail, a joey peeking out of the pouch. It should look clearly bigger and taller than a wallaby. |
| koala.png | A koala in a eucalyptus tree: grey fur, big fluffy ears, large black nose. |
| wombat.png | A common wombat: chunky brown body, short legs, small ears, side view. |
| platypus.png | A platypus: brown fur, flat duck-like bill, webbed feet, flat tail. |
| emu.png | An emu: tall shaggy brown bird with a long neck and long legs. |
| echidna.png | A short-beaked echidna: cream spines with brown fur between them, long thin snout. |
| tasmanian-devil.png | A Tasmanian devil: black fur, white stripe across the chest, pink ears, mouth open showing teeth. |
| wallaby.png | A red-necked wallaby, sitting: grey body with a reddish neck and shoulders, dark paws and feet. It should look smaller and greyer than a kangaroo. |
| kookaburra.png | A laughing kookaburra on a branch: white head with a brown stripe through the eye, brown wings with a blue patch, big beak. |
| cockatoo.png | A sulphur-crested cockatoo: white feathers, yellow crest raised, dark grey beak. |
| quokka.png | A quokka: very small, round and cat-sized, brown fur, short rounded ears, short tail, big smile. It should look clearly smaller and rounder than a wallaby. |
| dingo.png | A ginger dingo with white paws and chest, upright pointed ears and a bushy tail. |
| frill-necked-lizard.png | A frill-necked lizard: brown body with a big orange frill open around its head, mouth open. |
| frog.png | An Australian green tree frog: bright green, white belly, golden eyes, round toe pads. |
| moose.png | A bull moose: dark brown, wide flat antlers, long face, flap of skin under its chin. |
| beaver.png | A North American beaver: brown fur, orange front teeth, flat paddle-shaped tail. |
| polar-bear.png | A polar bear: white fur, black nose. |
| loon.png | A common loon swimming: black head, red eye, black and white checkered back, white stripes on the neck. |
| caribou.png | A caribou: brown body, white neck mane, tall curved branching antlers. |
| raccoon.png | A raccoon: grey fur, black mask over the eyes, ringed tail. |
| narwhal.png | A narwhal: mottled grey whale with one long spiral tusk, side view. |

Each picture fills its own square, so the kangaroo, wallaby and quokka won't show their real size next to each other. Body shape and colour make them different in the pictures; the Size tile in the app shows how big each one really is.

## 3. Put them in the app

1. Save each picture as a square PNG (1024 × 1024 is plenty) with the file name above, in `images/animals/`.
2. When all 41 are in, open `js/animals.js` and change `window.IMAGE_TYPE = 'svg';` to `window.IMAGE_TYPE = 'png';`.
   To use only some new pictures for now, list them instead, for example:
   `window.IMAGE_OVERRIDES = { koala: 'images/animals/koala.png', lion: 'images/animals/lion.png' };`
3. Run `python3 tools/make_sw.py` so the offline copy includes the new pictures, then push to GitHub.
