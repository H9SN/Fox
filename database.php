<?php
// database.php - إدارة قواعد البيانات
<?php
class SecureDB {
    private $connection;
    
    public function __construct() {
        $this->connect();
    }
    
    private function connect() {
        $host = getenv('DB_HOST') ?: 'localhost';
        $dbname = getenv('DB_NAME') ?: 'secure_browser';
        $username = getenv('DB_USER') ?: 'admin';
        $password = getenv('DB_PASS') ?: 'password';
        
        try {
            $this->connection = new PDO(
                "mysql:host=$host;dbname=$dbname;charset=utf8mb4", 
                $username, 
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            die("فشل الاتصال بقاعدة البيانات: " . $e->getMessage());
        }
    }
    
    public function createUser($username, $hashedPassword, $email) {
        $stmt = $this->connection->prepare(
            "INSERT INTO users (username, password, email, created_at) 
             VALUES (:username, :password, :email, NOW())"
        );
        
        $stmt->execute([
            ':username' => $username,
            ':password' => $hashedPassword,
            ':email' => $email
        ]);
        
        return $this->connection->lastInsertId();
    }
    
    public function getUser($username) {
        $stmt = $this->connection->prepare(
            "SELECT * FROM users WHERE username = :username"
        );
        
        $stmt->execute([':username' => $username]);
        return $stmt->fetch();
    }
    
    public function logActivity($userId, $activityType, $details) {
        $stmt = $this->connection->prepare(
            "INSERT INTO user_activities (user_id, activity_type, details, created_at) 
             VALUES (:user_id, :activity_type, :details, NOW())"
        );
        
        $stmt->execute([
            ':user_id' => $userId,
            ':activity_type' => $activityType,
            ':details' => json_encode($details)
        ]);
    }
    
    public function getEncryptionHistory($userId, $limit = 10) {
        $stmt = $this->connection->prepare(
            "SELECT * FROM encryption_history 
             WHERE user_id = :user_id 
             ORDER BY created_at DESC 
             LIMIT :limit"
        );
        
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    public function saveEncryptionRecord($userId, $method, $originalText, $encryptedText) {
        $stmt = $this->connection->prepare(
            "INSERT INTO encryption_history 
             (user_id, method, original_text, encrypted_text, created_at) 
             VALUES (:user_id, :method, :original_text, :encrypted_text, NOW())"
        );
        
        $stmt->execute([
            ':user_id' => $userId,
            ':method' => $method,
            ':original_text' => $originalText,
            ':encrypted_text' => $encryptedText
        ]);
        
        return $this->connection->lastInsertId();
    }
}
?>