import secrets

# Generate a random 24-byte key
new_secret_key = secrets.token_hex(24)
print(new_secret_key)
