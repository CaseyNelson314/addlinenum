class Program
{

    static void Main(string[] args)
    {
        if (args.Length == 1)
        {
            // コマンドラインから起動
            var sourceFilePath = args[0];

            if (System.IO.File.Exists(sourceFilePath) == false)
            {
                Console.Error.WriteLine("file not found!");
                return;
            }

            WriteConsoleProsess(sourceFilePath);
        }
        else
        {
            // 対話形式で起動
            var sourceFilePath = RequestInputSourceFilePath();

            switch (RequestInputOutputStream())
            {
                case OutputStream.Console:

                    WriteConsoleProsess(sourceFilePath);

                    // ポーズ
                    Console.WriteLine("press any key to exit");
                    Console.ReadLine();

                    break;

                case OutputStream.File:

                    // 出力ファイルの生成先は入力ファイルと同じディレクトリとする
                    var distDirName = System.IO.Path.GetDirectoryName(sourceFilePath) ?? throw new Exception("source file path is invalid");

                    var distFileName = RequestInputDistFileName();

                    var distFilePath = System.IO.Path.Combine(distDirName, distFileName);

                    WriteFileProsess(sourceFilePath, distFilePath);

                    Console.WriteLine("output file: " + distFilePath);

                    break;
            }
        }

    }


    static void WriteConsoleProsess(string sourceFilePath)
    {
        var lines = File.ReadAllLines(sourceFilePath);

        var digits = (int)Math.Log10(lines.Length) + 1;

        foreach (var (line, index) in lines.Select((line, index) => (line, index)))
        {
            Console.WriteLine(index.ToString($"D{digits}") + ":  " + line);
        }
    }

    static void WriteFileProsess(string sourceFilePath, string distFilePath)
    {
        var lines = File.ReadAllLines(sourceFilePath);

        var digits = (int)Math.Log10(lines.Length) + 1;

        using var writer = new StreamWriter(distFilePath);

        foreach (var (line, index) in lines.Select((line, index) => (line, index)))
        {
            writer.WriteLine(index.ToString($"D{digits}") + ":  " + line);
        }
    }

    /// @brief ユーザーから入力ファイルのパスを受け付ける
    /// @note 正しい入力がされるまでブロッキングする
    /// @return 入力ファイルのパス
    static string RequestInputSourceFilePath()
    {

        for (; ; )
        {
            Console.Write("source file path > ");

            var sourceFilePath = Console.ReadLine() ?? "";

            if (sourceFilePath.Length == 0)
            {
                continue;
            }

            if (System.IO.File.Exists(sourceFilePath))
            {
                return sourceFilePath;
            }
            else
            {
                Console.Error.WriteLine("file not found!");
                continue;
            }
        }

    }

    enum OutputStream
    {
        Console,
        File,
    };

    /// @brief ユーザーから出力データの出力先を受け付ける
    /// @note 正しい入力がされるまでブロッキングする
    /// @return 出力先
    static OutputStream RequestInputOutputStream()
    {
        Console.Write("output stream: console[c] / file[f] (c) > ");

        for (; ; )
        {
            var input = Console.ReadLine() ?? "";

            if (input.Length == 0)
            {
                return OutputStream.Console;
            }

            if (input == "c")
            {
                return OutputStream.Console;
            }

            if (input == "f")
            {
                return OutputStream.File;
            }
        }
    }


    /// @brief ユーザーから出力ファイル名を受け付ける
    /// @note 拡張子のない文字列を受け取った場合、txtファイルとなる
    /// @note 入力がされるまでブロッキングする
    /// @return 出力ファイル名
    static string RequestInputDistFileName()
    {
        Console.Write("file name (output.txt) > ");

        var distFileName = Console.ReadLine() ?? "";

        // ファイル名が指定されなかった場合, output.txt とする
        if (distFileName.Length == 0)
        {
            return "output.txt";
        }

        // 拡張子が指定されていない場合, txt ファイルとする
        if (System.IO.Path.HasExtension(distFileName) == false)
        {
            return distFileName + ".txt";
        }

        return distFileName;

    }

}

