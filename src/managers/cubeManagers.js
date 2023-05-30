const uniqid = require('uniqid');

const cubes = [
    {
        id: '76yiwx5t4liauldhr',
        name: 'Hellraiser\'s cube',
        description: 'A hellishly fun cube',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.nkcqLiMLQaZ2k5s7Hl2gYwHaHu%26pid%3DApi&f=1&ipt=474d3256769fdd512c78a3d463fdc38862ee54b33c3a711ace3bf4d76c939a3c&ipo=images',
        difficultyLevel: 6,
    },
    {
        id: '2n73sh8holaz66elc',
        name: 'Rubic Classic',
        description: 'Evergreen',
        imageUrl: 'https://www.hpcwire.com/wp-content/uploads/2018/07/Rubiks_Cube_shutterstock_271810067-675x380.jpg',
        difficultyLevel: 3
    }
];

exports.getAll = (search, from, to) => {
    let result = cubes.slice();

    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
};

exports.getOne = (cubeId) => cubes.find(x => x.id === cubeId);

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData
    }

    cubes.push(newCube);

    return newCube;
}