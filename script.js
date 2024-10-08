const app = new Vue({
  el: '#app', // Vueが管理する一番外側のDOM要素
  vuetify: new Vuetify(),
    data: {
       // Vue内部で使いたい変数は全てこの中に定義する
            Species: '', //パラメーター「Species」格納変数
            Name: '', //パラメーター「Name」格納変数
            Personality: '',//パラメーター「Personality」格納変数
            Imageurl: '',//パラメーター「Imageurl」格納変数

            dataList: [], // データ表示用配列
            dialog: false, // ダイアログ表示フラグ
            selectedData: null,
        
  },
  methods: {
    // DBにデータを追加する関数
    addData: async function() {

     // speciesの入力チェック（空白か文字以外なら終了）
    if (!this.Species || !isNaN(this.Species)) {
    console.log("種族が入力されていません、または数字が含まれています");
    return;
    }

     

      
      //POSTメソッドで送るパラメーターを作成
      const param = {
        Species : this.Species,
        Name : this.Name,
        Personality :this.Personality,
        Imageurl :this.Imageurl
      };
      
      //INSERT用のAPIを呼び出し
          const response = await axios.post('https://m3h-kishi-functionapi.azurewebsites.net/api/INSERT',param);
      
      //結果をコンソールに出力
          console.log(response.data);
          this.Species = '';
          this.Name = '';
          this.Personality = '';
          this.Imageurl = '';

      },
      
    // データベースからデータを取得する関数
    readData: async function() {
      //SELECT用のAPIを呼び出し      
        const response = await axios.get('https://m3h-kishi-functionapi.azurewebsites.net/api/SELECT');
      
      //結果をコンソールに出力
      console.log(response.data);
      
      //結果リストを表示用配列に代入
      this.dataList = response.data.List;
      },
      confirmDelete(data) {
          this.selectedData = data; // 削除対象データを設定
          this.dialog = true; // ダイアログを表示
      },

      // ダイアログで削除を確定する関数
      async confirmDeleteAction() {
          this.dialog = false; // ダイアログを閉じる
          await this.deleteData(this.selectedData); // 削除処理を呼び出す

          // 削除後にデータリストを更新
          this.dataList = this.dataList.filter(item => item !== this.selectedData);
      },
      //ここからDELETE
      deleteData: async function (data) {


          // speciesの入力チェック（空白か文字以外なら終了）
          if (!data.Species) {
              console.log("種族が入力されていません");
              return;
          }

          //POSTメソッドで送るパラメーターを作成
          const param = {
              Species: data.Species,
              Name: data.Name,
              Personality: data.Personality,
              Imageurl: data.Imageurl
          };

          //INSERT用のAPIを呼び出し
          const response = await axios.post('https://m3h-kishi-functionapi.azurewebsites.net/api/DELETE', param);

          //結果をコンソールに出力
          console.log(response.data);

      },

  },
});
document.addEventListener('DOMContentLoaded', function(){
  // タブに対してクリックイベントを適用
  const tabs = document.getElementsByClassName('tab');
  for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', tabSwitch, false);
  }

  // タブをクリックすると実行する関数
  function tabSwitch(){
    // タブのclassの値を変更
    document.getElementsByClassName('is-active')[0].classList.remove('is-active');
    this.classList.add('is-active');
    // コンテンツのclassの値を変更
    document.getElementsByClassName('is-show')[0].classList.remove('is-show');
    const arrayTabs = Array.prototype.slice.call(tabs);
    const index = arrayTabs.indexOf(this);
    document.getElementsByClassName('panel')[index].classList.add('is-show');
  };
}, false);