--------------------------------------------------------------------------------------------------------------------
--  Users
--------------------------------------------------------------------------------------------------------------------

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

--------------------------------------------------------------------------------------------------------------------
----  Player profile
--------------------------------------------------------------------------------------------------------------------


-- Création de la table 'player_profiles'
CREATE TABLE IF NOT EXISTS player_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    player_name VARCHAR(255) NOT NULL,
    best_score INTEGER DEFAULT 0,
    experience_points INTEGER DEFAULT 0,
    total_experience_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table 'game_sessions'
CREATE TABLE IF NOT EXISTS game_sessions (
    id SERIAL PRIMARY KEY,
    player_profile_id INTEGER REFERENCES player_profiles(id) ON DELETE CASCADE,
    wave_set_type VARCHAR(255),
    is_winning_session BOOLEAN DEFAULT FALSE,
    score INTEGER DEFAULT 0,
    invader_kills JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table 'bonus_inventory'
CREATE TABLE IF NOT EXISTS bonus_inventory (
    id SERIAL PRIMARY KEY,
    player_profile_id INTEGER REFERENCES player_profiles(id) ON DELETE CASCADE,
    type VARCHAR(255),
    effect JSONB,
    activation_timestamp TIMESTAMP,
    state VARCHAR(50) DEFAULT 'available',
    remaining_duration INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table 'player_skills'
CREATE TABLE IF NOT EXISTS player_skills (
    id SERIAL PRIMARY KEY,
    player_profile_id INTEGER REFERENCES player_profiles(id) ON DELETE CASCADE,
    skill_id VARCHAR(255),
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table 'player_walls'
CREATE TABLE IF NOT EXISTS player_walls (
    id SERIAL PRIMARY KEY,
    player_profile_id INTEGER REFERENCES player_profiles(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table 'player_ground_lines'
CREATE TABLE IF NOT EXISTS player_ground_lines (
    id SERIAL PRIMARY KEY,
    player_profile_id INTEGER REFERENCES player_profiles(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création d'une fonction pour mettre à jour la colonne 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Création d'un trigger qui utilise cette fonction pour les tables 'player_profiles', 'bonus_inventory', 'player_skills', 'player_walls', 'player_ground_lines'
DROP TRIGGER IF EXISTS update_player_profiles_updated_at ON player_profiles;
CREATE TRIGGER update_player_profiles_updated_at
BEFORE UPDATE ON player_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bonus_inventory_updated_at ON bonus_inventory;
CREATE TRIGGER update_bonus_inventory_updated_at
BEFORE UPDATE ON bonus_inventory
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_player_skills_updated_at ON player_skills;
CREATE TRIGGER update_player_skills_updated_at
BEFORE UPDATE ON player_skills
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_player_walls_updated_at ON player_walls;
CREATE TRIGGER update_player_walls_updated_at
BEFORE UPDATE ON player_walls
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_player_ground_lines_updated_at ON player_ground_lines;
CREATE TRIGGER update_player_ground_lines_updated_at
BEFORE UPDATE ON player_ground_lines
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

