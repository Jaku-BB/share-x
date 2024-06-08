# ShareX

Projekt zaliczeniowy na przedmiot *Programowanie* na [Akademii Górnośląskiej](https://www.gwsh.pl) w Katowicach.

Aplikacja internetowa **ShareX** pozwala użytkownikom na proste i szybkie udostępnianie plików.

Użytkownik chcąc udostępnić plik, przesyła go za pomocą formularza, a aplikacja generuje link, który pozwala na jego
pobranie.

Aplikację można przetestować pod adresem [https://share-x-client.vercel.app](https://share-x-client.vercel.app).

[Dokumentacja API](https://webapp-240608175051.azurewebsites.net/swagger)

## Stos technologiczny

- [ASP.NET Core 8](https://learn.microsoft.com/en-us/aspnet/core/getting-started/?view=aspnetcore-8.0)
- [Swagger](https://swagger.io)
- [Next.js](https://nextjs.org)

## Struktura projektu

- `server` - API
- `client` - front aplikacji

## Uruchomienie

### API

```bash
cd server
dotnet run
```

### Front

Należy pamiętać o uzupełnieniu pliku `.env` na podstawie `.env.example`.

```bash
cd client
npm install
npm run dev
```

## Autor

- [Jakub Bukała](https://github.com/Jaku-BB)
- [Rafał Gołyszny](https://github.com/LeszekSarepski)