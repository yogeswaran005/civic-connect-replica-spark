
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from '@/components/ui/use-toast';
import { Mail, Key, Info } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [officialCode, setOfficialCode] = useState('');
  const [password, setPassword] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // For demo purposes, we'll use a fixed OTP
  const demoOtp = "123456";

  // Valid municipal office credentials
  const validCredentials = [
    { code: 'MO8881', password: 'PS8882' },
    { code: 'MO8882', password: 'PS8883' },
    { code: 'MO8883', password: 'PS8884' },
    { code: 'MO8884', password: 'PS8885' },
    { code: 'MO8885', password: 'PS8886' },
    { code: 'MO8886', password: 'PS8887' },
    { code: 'MO8887', password: 'PS8888' },
    { code: 'MO8888', password: 'PS8889' },
    { code: 'MO8889', password: 'PS8890' },
    { code: 'MO8890', password: 'PS8891' },
  ];

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setSendingOtp(true);
    
    // Simulate OTP sending with a delay for a more realistic experience
    setTimeout(() => {
      toast({
        title: "OTP Sent",
        description: `For demo purposes, use the code: ${demoOtp}`,
      });
      
      setIsVerifying(true);
      setSendingOtp(false);
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setVerifyingOtp(true);
    
    // For demo purposes, we'll accept the fixed OTP or any 6-digit code
    setTimeout(() => {
      // Mock successful verification
      toast({
        title: "Login Successful",
        description: "Welcome to Municipal Corporation of India",
      });
      
      // Store user session info
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      
      setVerifyingOtp(false);
      
      // Redirect to report page
      navigate('/report');
    }, 1500);
  };

  const handleOfficialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validCredentials.some(
      cred => cred.code === officialCode && cred.password === password
    );
    
    if (isValid) {
      toast({
        title: "Login Successful",
        description: "Welcome, Municipal Office Staff",
      });
      
      // Store official session info
      localStorage.setItem('officialLoggedIn', 'true');
      localStorage.setItem('officialCode', officialCode);
      
      // Redirect to admin dashboard
      navigate('/admin');
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your code and password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container max-w-md mx-auto">
          <Card className="border-2 border-gray-100 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                Municipal Corporation of India
              </CardTitle>
              <CardDescription>
                Access citizen connect portal
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="citizen">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="citizen">Citizen Login</TabsTrigger>
                  <TabsTrigger value="municipal">Municipal Office</TabsTrigger>
                </TabsList>
                
                <TabsContent value="citizen">
                  {!isVerifying ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          We'll send you a one-time password to this email
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-md border border-blue-100 flex items-start gap-2 mb-2">
                        <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-blue-700">
                          This is a demo application. No real emails are sent.
                          When you click "Send OTP", a demo code will be provided for you to use.
                        </p>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={sendingOtp}>
                        {sendingOtp ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending OTP...
                          </>
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp" className="text-sm font-medium">
                          Enter OTP sent to {email}
                        </Label>
                        <div className="flex justify-center">
                          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                        <div className="text-xs text-gray-500 text-center flex flex-col gap-2">
                          <p>For demo purposes, use: <span className="font-bold">{demoOtp}</span></p>
                          <p>
                            Didn't receive OTP?{" "}
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-xs" 
                              onClick={() => setIsVerifying(false)}
                            >
                              Resend
                            </Button>
                          </p>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={verifyingOtp}>
                        {verifyingOtp ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </>
                        ) : (
                          "Verify & Login"
                        )}
                      </Button>
                    </form>
                  )}
                </TabsContent>
                
                <TabsContent value="municipal">
                  <form onSubmit={handleOfficialLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="code" className="text-sm font-medium">
                        Official Code
                      </Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="code"
                          placeholder="Enter official code (e.g. MO8881)"
                          className="pl-10"
                          value={officialCode}
                          onChange={(e) => setOfficialCode(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter password"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Login as Municipal Official
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
