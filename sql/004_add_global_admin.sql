-- Insert Global Admin User
-- Replace 'your_email@example.com' with your actual email
INSERT INTO users (email, name, role)
VALUES ('archie@lsi.org', 'Archie Garg', 'admin')
ON CONFLICT (email) 
DO UPDATE SET role = 'admin'; -- Elevate if already exists
