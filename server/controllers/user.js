import User from '../models/user.js'

export const createUser = async (req, res) =>{
  try{
    const {email} = req.params
    const user =  await User.findOne({ email });
    if (!user) {
      await User.create({ email, likedMovies: [] });
    }
    return res.status(200).json({ msg: "check ok!" });

  }catch(e){
    res.status(500).json({error: e.message});
    
  }
}

/** add liked movies  */

export const addToLikedMovies = async(req,res)=>{
    try{
        const {email, data} = req.body
        const user = await User.findOne({ email });
        if (user){
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies: [...user.likedMovies, data],
                },
                { new: true }
                );
                } else return res.status(501).json({ msg: "Movie already added to the liked list." });
        } else await User.create({ email, likedMovies: [data] });
        return res.status(200).json({ msg: "Movie added successfully." });



    }catch(e){
        res.status(500).json({error: e.message});
    }
}
export const getLikedMovies = async (req, res) => {
    try {
      const { email } = req.params;
      const user =  await User.findOne({ email });
      if (!user)  await User.create({ email, likedMovies: [] });
      return res.status(200).json({ movies: user.likedMovies });
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

export const removeFromLikedMovies = async (req, res) => {
    try {
      const { email, movieId } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const movies = user.likedMovies;
        const movieIndex = movies.findIndex(({ id }) => id === movieId);
        if ((!movieIndex) && (movieIndex !==0)) {
          return res.status(400).send({ msg: `Movie not found` });
        }
        movies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: movies,
          },
          { new: true }
        );
        return res.status(200).json({ movies });
      } else return res.status(400).send({ msg: "Movie not found." });
    } catch (e) {
        res.status(500).json({error: e.message});
    }
  };