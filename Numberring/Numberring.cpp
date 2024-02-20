#include <iostream>
#include <fstream>
#include <filesystem>
#include <string>

#include "strconv2.hpp"

/// @brief ユーザーから入力ファイルのパスを受け付ける
/// @note 正しい入力がされるまでブロッキングする
/// @return 入力ファイルのパス
static std::filesystem::path requestUserSourceFilePath()
{
	std::filesystem::path sourceFilePath;

	for (;;)
	{
		std::cout << "Source file path > ";
		std::cin >> sourceFilePath;
		std::cin.ignore(); // ignore \n

		if (std::filesystem::exists(sourceFilePath))
		{
			if (std::filesystem::is_regular_file(sourceFilePath))
				break;
			else
				std::cerr << "this is not file!" << std::endl;
		}
		else
		{
			std::cerr << "file not found!" << std::endl;
			continue;
		}
	}

	return sourceFilePath;
}


enum class OutputStream
{
	Console,
	File,
};

/// @brief ユーザーから出力データの出力先を受け付ける
/// @note 正しい入力がされるまでブロッキングする
/// @return 出力先
static OutputStream requestUserOutputStream()
{
	std::cout << "Output stream [c]console / [f]textfile (c) > ";

	for (;;)
	{
		switch (std::cin.get())
		{
		case 'c':
		case '\n':
			return OutputStream::Console;
		case 'f':
			return OutputStream::File;
		default:
			continue;
		}
	}
}


/// @brief ユーザーから出力ファイル名を受け付ける
/// @note 拡張子のない文字列を受け取った場合、txtファイルとなる
/// @note 入力がされるまでブロッキングする
/// @return 出力ファイル名
static std::filesystem::path requestUserOutputFileName()
{
	std::cout << "file name (output.txt) > ";
	std::cin.ignore(); // ignore \n

	std::string distFileName;
	if (std::cin.peek() == '\n')
	{
		// デフォルト
		distFileName = "output.txt";
	}
	else
	{
		std::cin >> distFileName;
	}

	// 拡張子が指定されていない場合、txtファイルとする
	if (not std::filesystem::path{ distFileName }.has_extension())
	{
		distFileName += ".txt";
	}

	return distFileName;
}


/// @brief 入力ストリームの各行先頭に行番号を加え、出力ストリームへ書き込む
/// @param source 入力ストリーム
/// @param dist 出力ストリーム
static void outputWithLineNumber(std::istream& source, std::ostream& dist)
{
	std::string input;
	for (int i = 0; std::getline(source, input); ++i)
	{
		dist << std::setw(3) << std::setfill('0') << i << ":  " << input << std::endl;
	}
}

int main(int argc, char* argv[])
{
	std::filesystem::path sourceFilePath;
	if (argc == 2)
	{
		// ファイルがドラッグアンドドロップされ起動時
		sourceFilePath = argv[1];
	}
	else
	{
		// 通常起動
		sourceFilePath = requestUserSourceFilePath();
	}

	switch (requestUserOutputStream())
	{

	case OutputStream::Console:
	{
		std::ifstream sourceFile(sourceFilePath);

		//outputWithLineNumber(sourceFile, std::cout);

		std::string input;
		for (int i = 0; std::getline(sourceFile, input); ++i)
		{
			std::cout << std::setw(3) << std::setfill('0') << i << ":  " << utf8_to_sjis(input) << std::endl;
		}

		break;
	}

	case OutputStream::File:
	{
		const auto distFileName = requestUserOutputFileName();
		const auto distFilePath = sourceFilePath.parent_path() / distFileName;

		std::cout << "output for " << distFilePath.string() << std::endl;

		std::ifstream sourceFile(sourceFilePath);
		std::ofstream distFile(distFilePath);

		outputWithLineNumber(sourceFile, distFile);

		break;
	}

	}

	system("pause");

}