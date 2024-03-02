# A3_Player
### *Custom Video and Audio Player *.

##### Welcome and thanks for your insterest..

### What is it?

Just as many developers, I would define myself as a melomaniac. I can't imagine a day work without my favorite tunes. YouTube, Spotify... you name it. However, tired of monthly subscriptions and long commercials, decided I had to come up with
an alternate solution. So, I put a few things together and voilá!
This is still a work in progress. For example, users are still added and authorized manually in my DB, and so many other things that need improvement to make it as smooth as any of the other apps mentioned before.

### What can it do?

- My webapp integrated YouTube and Spotify's API to make searches and reproduce data. 
- It allows you to continue to reproduce your media even when the browser has been closed (Nice for mobile). 
- Like in any other music app, you can create and edit playlists... shuffle among songs, and even shuffle accross all your playlists.
- It comes with Karaoke, which basically is the lyrics for any song that you want a click away. The app takes the information of the song being played to process your request of finding the lyrics.

### Work in progress

This is an important aspect because here's where you can contribute.

- Though the app allows you playing in the background, it still lacks of the controls and its interface.
- Convert videos seached on YouTube to .mp3 files and store them. (I've already been working with python for it) but there are two problems with it:
  1. If you store .mp3 files, firebase will eventually start making charges. (One of the things we're trying to scape here).
  2. I thought of storing them in base64 extension, but the string-chain is way too big and large.
- Any improvement is welcome as long as it's organized, maintainable, and HQ.

To get it to start, you will need to create your Firebase app, and store the credentials in your local .env file
Merges to /main are restricted to me. So please, make your PR's pointing at Development


Feel free to fork, and please give the repo a star.



![logo](https://res.cloudinary.com/dnqfh2chg/image/upload/v1692886911/apren-dev_logo_nv69q9.png)

[Visita nuestra web](https://a3-music-player.vercel.app/auth/login)
