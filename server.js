// Existing code
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = express();

// Use JSON middleware to automatically parse JSON
app.use(express.json());

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const { user, error } = await supabase.auth.signUp({
    email: username,
    password: password,
  });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ user: user });
});

// Add this code for the login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const { user, error } = await supabase.auth.signIn({
    email: username,
    password: password,
  });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ user: user });
});