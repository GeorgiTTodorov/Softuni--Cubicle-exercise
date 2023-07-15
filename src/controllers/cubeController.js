const router = require("express").Router();

const cubeManager = require('../managers/cubeManagers.js');
const accessoryManager = require('../managers/accessoryManager.js');
const { generateDifficultyOptions } = require('../util/helper.js');
const { isAuth } = require('../middlewares/authMiddleware.js');

// Path /cubes/create
router.get("/create", isAuth, (req, res) => {
    
    res.render("cube/create");
});

router.post("/create", isAuth, async (req, res) => {
  const { 
    name,
    description,
    imageUrl,
    difficultyLevel,
 } = req.body;

 const creatorId = req.user._id;


    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        creatorId
    });

    res.redirect("/");
});

router.get('/:cubeId/details', async (req,res) => {
    
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    console.log(cube.accessories);
    const user = req.user?._id;
    let isOwner = user === cube.creatorId?.toString();

    if (!user) {
        isOwner = false;
    }

    const accessories = await accessoryManager.getAllOthers(cube.accessories).lean();
    console.log(accessories);
    const hasAccessories = accessories.length > 0;

    
    if(!cube) {
        res.redirect('/404');
    }

    res.render('cube/details', { cube, isOwner, accessories, hasAccessories })
});

router.get('/:cubeId/attach-accessory', isAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getAllOthers(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', {cube, accessories, hasAccessories});
});

router.post('/:cubeId/attach-accessory', isAuth, async (req, res) => {
        const { accessory: accessoryId } = req.body;
        const cubeId = req.params.cubeId;

       await cubeManager.attachAccessory(cubeId, accessoryId);

       res.redirect(`/${cubeId}/details`);
});

router.get('/:cubeId/delete', isAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    const options = generateDifficultyOptions(cube.difficultyLevel);

    res.render('cube/delete', { cube, options });

});

router.get('/:cubeId/edit', isAuth, async (req,res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    const options = generateDifficultyOptions(cube.difficultyLevel);

    res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', isAuth, async (req, res) => {
    const cubeData = req.body;

    await cubeManager.update(req.params.cubeId, cubeData);

    res.redirect(`/${req.params.cubeId}/details`)
});


router.post('/:cubeId/delete', isAuth, async (req, res) => {
    await cubeManager.delete(req.params.cubeId);

    res.redirect('/');
});



module.exports = router;
