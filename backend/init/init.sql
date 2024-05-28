-- Création de la table 'users'
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) DEFAULT NULL,
    wallet VARCHAR(255) DEFAULT NULL UNIQUE,
    email VARCHAR(255) DEFAULT NULL UNIQUE,
    password VARCHAR(255) DEFAULT NULL,
    company VARCHAR(255) DEFAULT NULL,
    isEmailVerified BOOLEAN DEFAULT FALSE,
    isWalletVerified BOOLEAN DEFAULT FALSE,
    isLocked BOOLEAN DEFAULT FALSE, 
    avatar VARCHAR(255) DEFAULT NULL,
    status VARCHAR(50) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table 'nonces'
CREATE TABLE IF NOT EXISTS nonces (
    id SERIAL PRIMARY KEY,
    wallet VARCHAR(255) UNIQUE,
    nonce VARCHAR(255) NOT NULL,
    expiration TIMESTAMP NOT NULL
);

-- Création d'une fonction pour mettre à jour la colonne 'updatedAt'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updatedAt = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Création d'un trigger qui utilise cette fonction pour la table 'users'
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
