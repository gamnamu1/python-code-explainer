import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Streamdown } from 'streamdown';
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Code2, Upload, BookOpen, GraduationCap } from "lucide-react";

export default function Home() {
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [activeTab, setActiveTab] = useState<"elementary" | "college">("elementary");

  const analyzeMutation = trpc.codeExplainer.analyze.useMutation({
    onSuccess: () => {
      toast.success("코드 분석이 완료되었습니다!");
    },
    onError: (error) => {
      toast.error(`분석 실패: ${error.message}`);
    },
  });

  const handleAnalyze = () => {
    if (!code.trim()) {
      toast.error("코드를 입력해주세요");
      return;
    }
    analyzeMutation.mutate({ code, fileName: fileName || undefined });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.py')) {
      toast.error("파이썬 파일(.py)만 업로드 가능합니다");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCode(content);
      toast.success(`${file.name} 파일을 불러왔습니다`);
    };
    reader.readAsText(file);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-16 mx-auto mb-4" />}
            <CardTitle className="text-2xl">파이썬 코드 설명 생성기</CardTitle>
            <CardDescription>
              파이썬 코드를 초등학생부터 전공자 수준까지 단계별로 쉽게 설명해드립니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="lg">
              <a href={getLoginUrl()}>로그인하고 시작하기</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-10" />}
            <h1 className="text-xl font-bold text-gray-900">파이썬 코드 설명 생성기</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
            <Button variant="outline" size="sm" onClick={() => logout()}>
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 코드 입력 영역 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                파이썬 코드 입력
              </CardTitle>
              <CardDescription>
                코드를 직접 입력하거나 .py 파일을 업로드하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {fileName || "파이썬 파일(.py)을 클릭하여 업로드"}
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".py"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              <div className="relative">
                <div className="absolute top-2 right-2 text-xs text-gray-400">
                  {code.length} 글자
                </div>
                <Textarea
                  placeholder="또는 여기에 파이썬 코드를 직접 입력하세요..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={analyzeMutation.isPending || !code.trim()}
                className="w-full"
                size="lg"
              >
                {analyzeMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    분석 중...
                  </>
                ) : (
                  "코드 분석하기"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* 설명 결과 영역 */}
          <Card>
            <CardHeader>
              <CardTitle>설명 결과</CardTitle>
              <CardDescription>
                두 가지 수준의 설명을 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyzeMutation.isPending ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-gray-600">AI가 코드를 분석하고 있습니다...</p>
                </div>
              ) : analyzeMutation.data ? (
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "elementary" | "college")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="elementary" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      초등학생 수준
                    </TabsTrigger>
                    <TabsTrigger value="college" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      전공자 수준
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="elementary" className="mt-4">
                    <div className="prose prose-sm max-w-none bg-blue-50 rounded-lg p-6">
                      <Streamdown>{analyzeMutation.data.elementaryExplanation || "설명이 생성되지 않았습니다."}</Streamdown>
                    </div>
                  </TabsContent>
                  <TabsContent value="college" className="mt-4">
                    <div className="prose prose-sm max-w-none bg-indigo-50 rounded-lg p-6">
                      <Streamdown>{analyzeMutation.data.collegeExplanation || "설명이 생성되지 않았습니다."}</Streamdown>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  <Code2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>코드를 입력하고 분석 버튼을 눌러주세요</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
