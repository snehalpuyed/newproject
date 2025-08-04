const express=require("express");
const router=express.Router();
const upload= require("./../middleware/uploads");
router.post("/upload",upload.single("image"),(req,res)=>{
    if(!req.file)
    {
        return res.status(400).json({ msg:"No file uploaded"});

    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({msg:"Image uploads successfully",imageUrl});

});
// Upload a single video file (field name should be "video")
router.post("/upload-video", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No video uploaded" });
  }

  const videoUrl = `${req.protocol}://${req.get("host")}/uploads/videos/${req.file.filename}`;
  res.json({ msg: "Video uploaded successfully", videoUrl });
});
module.exports=router;
