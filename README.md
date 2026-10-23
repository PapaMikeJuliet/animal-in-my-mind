# Animal in My Mind

An iPad-first web app for the guessing game "Animal in My Mind", and a fact-learning app for a young reader. Every answer is meant to be technically correct, including the surprising ones (moose swim, platypuses lay eggs). No backend, no accounts, no external links. Works offline once loaded.

## Screens

- **Title**: the title picture. Tap anywhere or tap Start.
- **Home**: two big buttons, read aloud when tapped. Also a sound on/off button and Photo credits (for grown-ups).
- **I'm thinking of an animal** (reference page while being quizzed)
  - Pick an animal from the photo grid, or tap **Pick for me**.
  - The animal card shows 11 clue tiles plus a fun fact: kind, body covering, legs and other limbs, fly, swim, where it lives, where in the world, what it eats, size, colours and special features. Tap a tile to hear the answer.
  - A question counter (+ and −) keeps track of the other player's questions.
  - **They guessed it!** reveals the animal with a celebration. This is the only time its name is read aloud.
  - **New Animal** picks another at random; every animal comes up once before any repeat.
- **I'm guessing**
  - **Hint**: tap once for a question-type picture, again for a full question (read aloud), again for the next type. Types rotate so every kind of question comes up.
  - **Animal ideas**: the photo grid; tap one to see its card.
  - **Play with the app**: the app picks a secret animal. Ask questions by tapping a question picture, then a question; the app answers Yes, No or About the same, and keeps a list. Tap **My guess** to choose an animal, or **Give up** to see the answer.

The thinking-mode card never reads the animal's name aloud, so the person guessing can't overhear it. Clue tiles and fun facts use "It..." sentences.

## Put it on the iPad

1. Open the GitHub Pages link in Safari.
2. Tap Share, then **Add to Home Screen**.
3. Open it from the home screen. It runs full screen and works without internet after the first visit.

If there is no sound, check the iPad volume and that Silent Mode is off.

### Keep him in the app (Guided Access)

1. On the iPad, go to Settings, Accessibility, Guided Access, and turn it on. Set a passcode.
2. Open the app, then triple-click the top button (or the Home button on older iPads) and tap Start.
3. To leave, triple-click again and enter the passcode.

## Animal data

All animals are in `js/animals.js`, one line each, with the allowed values listed at the top of the file. Hint and Play questions are built from this data, so a new habitat, colour or feature shows up automatically once animals use it.

To add an animal: add a line, add a picture named after its `id` in `images/animals/`, add a photo file name to `PHOTOS`, then run `python3 tools/make_sw.py` so the offline copy picks up the new files.

## Pictures

The cartoon drawings are placeholders. `GEMINI-IMAGES.md` has a style prompt and one line per animal for making matching pictures in Gemini, and how to switch the app over to them.

## Photos

Photos are listed in `PHOTOS` near the bottom of `js/animals.js` as Wikimedia Commons file names. To change one, find a better photo on commons.wikimedia.org, copy its file name (without "File:") and paste it in. The Photo credits screen fetches each photographer's name and licence from Commons, and flags any file name it can't find.

Photos load from Wikimedia, so they need internet the first time. After that the app keeps a copy for offline use. If a photo can't load, the drawing shows instead.

## Publish on GitHub Pages

Push this folder to a GitHub repository, then in the repository go to Settings, Pages, and set the source to the `main` branch, root folder. The site appears at `https://<username>.github.io/<repository>/`.

## Credits

Typeface: Andika by SIL International, designed for early readers (SIL Open Font License, see `fonts/OFL-LICENSE.txt`). Animal drawings and icons are original SVG artwork made for this app. Title art supplied by Pete. Animal photos are from Wikimedia Commons; photographers and licences are listed in the app under Photo credits.
