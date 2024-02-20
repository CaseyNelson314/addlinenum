# addlinenum

行先頭に行番号をつける CLI アプリ

![image](https://github.com/CaseyNelson314/addlinenum/assets/91818705/55a39131-2eb3-45f2-a5d5-eccad8ba25fa)

## Usage

以下の URL から実行ファイルを取得できます. 対話形式, コマンドライン形式, の 二通りで起動できます. 

https://github.com/CaseyNelson314/addlinenum/releases/download/v1.0.0/addlinenum.exe

### 対話形式

実行ファイルをダブルクリックすると対話形式で起動できます. 起動するといくつか入力事項を求められます. 

1. `source file path >`

   行番号を付与する基となるファイルの絶対パスを指定します. 

2. `output stream: console[c] / file[f] (c) >`

   行番号を付与したデータの出力先を指定します. 何も入力せず Enter を押した場合コンソールへ出力します. 

   `c`: コンソール画面

   `f`: ファイル

3. `file name (output.txt) >`

   2 でファイルを選択した場合, 出力ファイル名を指定します. 何も入力せず Enter を押した場合 output.txt になります. 出力先はソースファイルのあるフォルダになります. 

![image](https://github.com/CaseyNelson314/addlinenum/assets/91818705/afa3bdb1-760f-4c39-9ddf-cb8a437f105b)


### コマンドラインから

実行ファイルがあるディレクトリへ移動

```sh
cd 実行ファイルがあるディレクトリ
```

実行ファイルの第一引数にファイルパスを渡すと, 行番号を付与したファイルの中身が出力されます. 

```sh
./addlinenum.exe main.cpp
```

![image](https://github.com/CaseyNelson314/addlinenum/assets/91818705/07f12479-0286-43fd-98af-a9b1ac71fea4)

> パイプラインを使うと結果をファイルに書き込めます. 
>
> ```sh
> ./addlinenum.exe main.cpp > output.txt
> cat .\output.txt
> 0:  #include <iostream>
> 1:
> 2:  int main() {
> 3:      std::cout << "Hello, World!" << std::endl;
> 4:      return 0;
> 5:  }
> ```

> 引数を渡さない場合, 対話形式で起動されます. 
>
> ```sh
> ./addlinenum.exe
> source file path >
> ```

> 実行ファイルがあるディレクトリを Path 環境変数に追加すると, いつでもどこでも実行ファイルを呼び出せます. 
>
> ```sh
> addlinenum main.cpp
> ```
