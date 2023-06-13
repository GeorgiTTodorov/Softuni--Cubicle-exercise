const router = require("express").Router();

const cubeManager = require('../managers/cubeManagers.js');
const accessoryManager = require('../managers/accessoryManager.js');

// Path /cubes/create
router.get("/create", (req, res) => {
    
    res.render("cube/create");
});

router.post("/create", async (req, res) => {
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
    const token = req.user;
    const isOwner = token._id === cube.creatorId?.toString();
    const accessories = await accessoryManager.getAllOthers(cube.accessories).lean();
    const hasAccessories = accessories.length > 0;
    console.log(accessories);
    
    if(!cube) {
        res.redirect('/404');
    }

    res.render('cube/details', { cube, isOwner, accessories, hasAccessories })
});

router.get('/:cubeId/attach-accessory',async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getAllOthers(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', {cube, accessories, hasAccessories});
});

router.post('/:cubeId/attach-accessory',async (req, res) => {
        const { accessory: accessoryId } = req.body;
        const cubeId = req.params.cubeId;

       await cubeManager.attachAccessory(cubeId, accessoryId);

       res.redirect(`/${cubeId}/details`);
});

router.get('/:cubeId/delete', (req, res) => {
    res.render('cube/delete');

});

router.get('/:cubeId/edit', (req,res) => {
    res.render('cube/edit');
});



module.exports = router;
