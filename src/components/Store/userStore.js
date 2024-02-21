import { makeAutoObservable } from "mobx"

export default class UserStore {
    isBottomVisible = false
    isTabBarVisible = 'flex'

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
}