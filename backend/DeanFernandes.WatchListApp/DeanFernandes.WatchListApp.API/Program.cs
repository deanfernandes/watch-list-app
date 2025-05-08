using DeanFernandes.WatchListApp.API.Data;
using DeanFernandes.WatchListApp.API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/movies", async (AppDbContext db) =>
{
    var movies = await db.Movies
        .Select(m => new MovieDto
        {
            Id = m.Id,
            Title = m.Title,
            GenreId = m.GenreId,
            Watched = m.Watched
        })
        .ToListAsync();

    return Results.Ok(movies);
});

app.MapGet("/movies/{id}", async (int id, AppDbContext db) =>
{
    var movie = await db.Movies.FindAsync(id);
    if (movie == null) return Results.NotFound();

    return Results.Ok(new MovieDto
    {
        Id = movie.Id,
        Title = movie.Title,
        GenreId = movie.GenreId,
        Watched = movie.Watched
    });
});

app.MapPost("/movies", async (CreateUpdateMovieDto dto, AppDbContext db) =>
{
    var movie = new Movie
    {
        Title = dto.Title,
        GenreId = dto.GenreId
    };

    db.Movies.Add(movie);
    await db.SaveChangesAsync();

    var resultDto = new MovieDto
    {
        Id = movie.Id,
        Title = movie.Title,
        GenreId = movie.GenreId,
        Watched = movie.Watched
    };

    return Results.Created($"/movies/{movie.Id}", resultDto);
});

app.MapPut("/movies/{id}", async (int id, CreateUpdateMovieDto dto, AppDbContext db) =>
{
    var movie = await db.Movies.FindAsync(id);
    if (movie == null) return Results.NotFound();

    movie.Title = dto.Title;
    movie.GenreId = dto.GenreId;
    movie.Watched = dto.Watched;
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/movies/{id}", async (int id, AppDbContext db) =>
{
    var movie = await db.Movies.FindAsync(id);
    if (movie == null) return Results.NotFound();

    db.Movies.Remove(movie);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapGet("/genres", async (AppDbContext db) =>
{
    var genres = await db.Genres
        .Select(g => new GenreDto
        {
            Id = g.Id,
            Name = g.Name
        })
        .ToListAsync();

    return Results.Ok(genres);
});

app.MapGet("/genres/{id}", async (int id, AppDbContext db) =>
{
    var genre = await db.Genres.FindAsync(id);
    if (genre == null) return Results.NotFound();

    return Results.Ok(new GenreDto
    {
        Id = genre.Id,
        Name = genre.Name
    });
});

app.MapPost("/genres", async (CreateUpdateGenreDto dto, AppDbContext db) =>
{
    var genre = new Genre { Name = dto.Name };
    db.Genres.Add(genre);
    await db.SaveChangesAsync();

    var resultDto = new GenreDto
    {
        Id = genre.Id,
        Name = genre.Name
    };

    return Results.Created($"/genres/{genre.Id}", resultDto);
});

app.MapPut("/genres/{id}", async (int id, CreateUpdateGenreDto dto, AppDbContext db) =>
{
    var genre = await db.Genres.FindAsync(id);
    if (genre == null) return Results.NotFound();

    genre.Name = dto.Name;
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/genres/{id}", async (int id, AppDbContext db) =>
{
    var genre = await db.Genres.FindAsync(id);
    if (genre == null) return Results.NotFound();

    db.Genres.Remove(genre);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

void SeedDatabase(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!IsDatabaseEmpty(db)) return;

    var action = new Genre { Name = "Action" };
    var comedy = new Genre { Name = "Comedy" };
    var drama = new Genre { Name = "Drama" };
    db.Genres.AddRange(action, comedy, drama);

    db.Movies.AddRange(
        new Movie { Title = "Die Hard", Genre = action },
        new Movie { Title = "Superbad", Genre = comedy },
        new Movie { Title = "The Godfather", Genre = drama }
    );
    db.SaveChanges();
}

bool IsDatabaseEmpty(AppDbContext db)
{
    return !(db.Genres.Any() || db.Movies.Any());
}

SeedDatabase(app);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowLocalhost3000");

app.Run();