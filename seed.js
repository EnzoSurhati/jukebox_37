const { prisma } = require('./common');
const { faker } = require('@faker-js/faker');

const seed = async (numOfUsers = 5, numOfTracks = 20, numOfPlaylists = 10) => {
  try {
    //-----------users---------//
    const users = [];
    for (let i = 0; i < numOfUsers; i++) {
      const user = await prisma.user.create({
        data: {
          username: faker.internet.username(),
        },
      });
      users.push(user);
    }
    //-----------tracks---------//
    const tracks = [];
    for (let i = 0; i < numOfTracks; i++) {
      const track = await prisma.track.create({
        data: {
          name: faker.music.songName(),
        },
      });
      tracks.push(track);
    }

    for(let i = 0; i < numOfPlaylists; i++) {
      const owner = users[Math.floor(Math.random() * users.length)];
      const randomTracks = tracks.sort(() => 0.5-Math.random()).slice(8, Math.floor(Math.random() * tracks.length));
      await prisma.playlist.create({
        data: {
          name: faker.music.album(),
          description: faker.lorem.sentence(),
          ownerId: owner.id,
          tracks: {
            connect: selectedTracks.map((track) => ({id: track.id})),
          },
        },
      });
    }
      console.log('successfull seeding');
  } catch (error){
    console.log(error);
  }
};

seed();