# Seneca Exercise - Cause & Effect Module

#### Submitted by Matthew Read (mattread90@gmail.com)

## Installation instructions

Clone this repo and, inside of the projects root directory, run the command 

```
npm install
```

I created this app using `create-react-native-app` to get up and running quickly. This uses Expo, which also makes it easy to view the app through the Expo app. If you are unfamiliar with Expo, please see instructions in `EXPO_INSTRUCTIONS.md`.

Basically, if you have the Expo app on your phone (you can download it from the App store), run the command

```
npm start
```

and follow the Expo app instructions to scan the QR that should be generated in your console. The app will soon run on your device.

Alternatively, you can run

```
npm ios
```

to start the app on an iOS simulator if you are using a Mac.

## Technical and design considerations

I carried out a [small amount of research](https://www.teachervision.com/professional-development/cause-effect-lesson) on effective techniques for learning Cause-Link-Effect schemas. The general consensus in the visual sense seemed to favour flow-chart-like diagrams, therefore I based my design around this concept.

As the purpose of the app is to help users learn information rather than simply test them, I wanted the interface to give the user a complete view of the information they are trying to learn, so that the visual image they see on the screen will hopefully stick in their heads.

This is how I came up with the concept of presenting the user with a flow-chart diagram with cards for each part of the Cause-Link-Effect relationship. The user is free to switch between the provided 'Link' cards at will, and is able to view the complete flow-chart and decide if their chosen answer looks correct to them. When they submit their answer, I hope that the positive reinforcement of the on-screen feedback will cement in their minds that what they are looking at is correct, and that they will remember this image for future retrieval.

I put some effort into making the user interface slick and enjoyable to use. To this end, I decided to allow the user to __swipe__ between the different answers, with instructions to assist with this and indicators to display how many answer options there are to consider. Arrow buttons are also available to indicate that there are further cards to view to the left or right.

When a user submits an answer, visual on-screen feedback informs them whether they were correct or not, and allows them to review their answer if they were wrong. When a user answers correctly they are given positive feedback (I experimented with including emojis to appeal to a younger audience) and the question slides off the screen to be replaced with the next question. I created this transition to drive home to the user that they are viewing a new and possibly unrelated question, and so they can change their mindset accordingly. Without this transition (simply updating the question and answer text) I didn't feel it was clear enough that something new was being asked of the user.