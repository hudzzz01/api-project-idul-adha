# be-api-project-idul-adha

Deskripsi singkat proyek Anda di sini.

## Persyaratan

Pastikan Anda telah menginstal:

- Node.js
- npm (Manajer Paket Node.js)

## Instalasi

1. **Clone Repositori**

    ```bash
    git clone https://github.com/username/api-project-idul-adha.git
    ```

2. **Masuk ke Direktori Proyek**

    ```bash
    cd api-project-idul-adha
    ```

3. **Instal Dependensi**

    ```bash
    npm install
    ```
3. **siapkan database**
   buat database mysql kosong terserah kamu namanya dan masukan url database kosong 
   masukan url database ke .env

   contoh kalau saya mengunakan local host database di xampp dan phpmy admin sebagai berikut :
   DATABASE_URL="mysql://root:@localhost:3306/project_idul_adha"

4. **siapkan database**
   isi database dengan menjalankan printah
    ```bash
    npx prisma db push
    ```
    atau
   
   ```bash
    npx prisma migrate dev
    ```
    
## Menjalankan Aplikasi

Untuk menjalankan aplikasi, gunakan perintah:

```bash
npm run dev
