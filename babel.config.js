module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //mint-ui按需引入
  "plugins": [["component", {
    "libraryName": "mint-ui",
    "style": true
  }]]
  
  
}
