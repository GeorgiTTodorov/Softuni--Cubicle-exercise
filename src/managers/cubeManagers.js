const uniqid = require('uniqid');

const cubes = [
    {
        id: '76yiwx5t4liauldhr',
        name: 'Hellraiser\'s cube',
        description: 'A hellishly fun cube',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.nkcqLiMLQaZ2k5s7Hl2gYwHaHu%26pid%3DApi&f=1&ipt=474d3256769fdd512c78a3d463fdc38862ee54b33c3a711ace3bf4d76c939a3c&ipo=images',
        difficultyLevel: 6,
    }
];

exports.getAll = () => cubes.slice();

exports.getOne = (cubeId) => cubes.find(x => x.id === cubeId);

exports.create = (cube) => {
    const newCube = {
        id: uniqid(),
        ...cube
    }

    cubes.push(newCube);

    return newCube;
}