import AuthLoginForm from "@/components/Auth/AuthLoginForm";
import SNSAuthList from "@/components/Oauth/SNSAuthList";

export default function Login() {
  return (
    <div>
      <AuthLoginForm />
      <SNSAuthList />
    </div>
  );
}
