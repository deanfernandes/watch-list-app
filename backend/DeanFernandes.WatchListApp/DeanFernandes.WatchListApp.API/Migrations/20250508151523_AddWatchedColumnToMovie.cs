using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeanFernandes.WatchListApp.API.Migrations
{
    /// <inheritdoc />
    public partial class AddWatchedColumnToMovie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Watched",
                table: "Movies",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Watched",
                table: "Movies");
        }
    }
}
