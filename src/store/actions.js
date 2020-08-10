import * as types from "./mutation-types"
export default{
         getshopcart(contents, payload) {
                  contents.commit(types.POST_SHOPCART, payload)
         }
}