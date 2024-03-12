import $api from "../components/context/Api";

export const createNewPost = async (formData)=>{
    return $api.post('/post/createPost', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const getInterestingPosts = async () =>{
    return $api.get('/post/interestingPosts')
}

export const getMyActiveAds = async () =>{
    return $api.get('/post/myAdds')
}

export const removePost = async (post_id) =>{
    return $api.delete(`/post/removePost`, {
        params:{
            post_id: post_id
        }
    })
}
