import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginTemplate } from '../../components/templates/LoginTemplate/LoginTemplate';
import { LoginForm, type LoginCredentials } from '../../components/organisms/LoginForm/LoginForm';
import { PartnerBar } from '../../components/organisms/PartnerBar/PartnerBar';
import { useAuth } from '../../contexts/useAuth';
import { supabase } from '../../lib/supabase';
import { PARTNERS } from './partners';

const PAGE_TITLE = 'Lançamentos de contas a pagar';

export function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already authenticated (e.g. returning with a live session) → skip the form.
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async ({ email, password }: LoginCredentials) => {
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError('E-mail ou senha incorretos.');
      return;
    }

    navigate('/dashboard', { replace: true });
  };

  return (
    <LoginTemplate>
      <LoginForm
        title={PAGE_TITLE}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
      <div className="mt-6 flex flex-col items-center gap-3">
        <PartnerBar partners={PARTNERS} />
      </div>
    </LoginTemplate>
  );
}
