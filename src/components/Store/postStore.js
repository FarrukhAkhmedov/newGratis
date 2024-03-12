import { makeAutoObservable, remove } from "mobx"
import { createNewPost, getInterestingPosts, getMyActiveAds, removePost } from "../../Functions/PostFunctions"

export default class PostStore {
    isBottomVisible = false
    isTabBarVisible = 'flex'
    isLoading = false
    allPosts = []
    myPosts = []

    constructor(){
        makeAutoObservable(this)
    }

    bottomSheetOpen(){
        this.isBottomVisible = true
        this.isTabBarVisible = 'none'
    }

    bottomSheetClose(){
        this.isBottomVisible = false
        this.isTabBarVisible = 'flex'
    }

    setAllPosts(payload){
        this.allPosts = payload
    }

    setMyPosts(payload){
        this.myPosts = payload
    }

    async createPost(address, description, itemName, objectType, qualityRating, photo){
        const formData = new FormData()
        formData.append('addPhoto', {
            name: 'photo',
            uri: photo.path,
            type: photo.mime
        })
        formData.append('description', description )
        formData.append('address', address )
        formData.append('itemName', itemName )
        formData.append('objectType', objectType )
        formData.append('qualityRating', qualityRating )

        try{
            await createNewPost(formData)
        } catch(e){
            console.error(e);
        }

    }

    async getPosts(){
        try{
            const res = await getInterestingPosts()
            this.setAllPosts(res.data)
        } catch (e) {
            console.error(e);
        }
    }

    async getMyAdds(){
        try{
            const res = await getMyActiveAds()
            console.log(res.data);
            this.setMyPosts(res.data)

        } catch(e){
            console.error(e);
        }
    }

    async deletePost(post_id){
        try{
            await removePost(post_id)
        } catch(e){
            
        }
    }
}