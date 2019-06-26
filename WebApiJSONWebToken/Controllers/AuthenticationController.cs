using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApiJSONWebToken.DAL;
using WebApiJSONWebToken.Models;

namespace WebApiJSONWebToken.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private UserRepository _userRepository;
        public AuthenticationController(UserRepository userRepository) => _userRepository = userRepository;

        [HttpPost("login")]
        [ProducesResponseType(200, Type = typeof(JwtSecurityTokenHandler))]
        [ProducesResponseType(400)]
        public IActionResult Login([FromBody] User userParam)
        {
            var user = _userRepository.Login(userParam.Username, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });


            var userRole = (user.IsAdmin) ? "admin" : "user";

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySecretKey010203"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                claims: new List<Claim> {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, userRole)
                },
                expires: DateTime.Now.AddDays(2),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new { Token = tokenString });

        }

        [HttpGet("listar")]
        public ActionResult GetUsers()
        {

            SqlConnection conn = new SqlConnection("Data Source=DESKTOP-GN1S5UA\\SERVER;Initial Catalog=Employee;Integrated Security=SSPI");
            conn.Open();
            var jsonResult = new StringBuilder();

            SqlCommand command = new SqlCommand("Select * From perfil FOR JSON PATH", conn);
            // int result = command.ExecuteNonQuery();
            using (SqlDataReader reader = command.ExecuteReader())
            {
                if (!reader.HasRows)
                {
                    jsonResult.Append("[]");
                }
                else
                {
                    while (reader.Read())
                    {
                        jsonResult.Append(reader.GetValue(0).ToString());
                        jsonResult.Replace(@"\", " ");
                    }
                }
            }
            jsonResult.Replace("\\\t", "\t");
            jsonResult.Replace("\\\n", "\n");
            jsonResult.Replace("\\\r", "\r");

            return Ok(jsonResult.ToString());
        }

        [HttpPost("adduser")]
        public ActionResult Adduser([FromBody] angular.api.Models.UserViewModel users)
        {
            var user = _userRepository.insert(users.firstname, users.lastname, users.password, users.passwordrepeat, users.postcode, users.Email, users.emailrepeat);
            return Ok();
        }



        [HttpPost("deleteuser")]
        public ActionResult Deleteuser([FromBody] angular.api.Models.UserViewModel user)
        {

            return Ok();
        }

        [HttpGet("listar/{id}")]
        public ActionResult editar(int id)
        {
            SqlConnection conn = new SqlConnection("Data Source=DESKTOP-GN1S5UA\\SERVER;Initial Catalog=Employee;Integrated Security=SSPI");
            conn.Open();
            var jsonResult = new StringBuilder();

            SqlCommand command = new SqlCommand("Select * From perfil WHERE ID=@ID FOR JSON PATH", conn);
            command.Parameters.AddWithValue("@ID", id);
            // int result = command.ExecuteNonQuery();
            using (SqlDataReader reader = command.ExecuteReader())
            {
                if (!reader.HasRows)
                {
                    jsonResult.Append("[]");
                }
                else
                {
                    while (reader.Read())
                    {
                        jsonResult.Append(reader.GetValue(0).ToString());
                        jsonResult.Replace(@"\", " ");
                    }
                }
            }
            jsonResult.Replace("\\\t", "\t");
            jsonResult.Replace("\\\n", "\n");
            jsonResult.Replace("\\\r", "\r");

            return Ok(jsonResult.ToString());

        }
        [HttpDelete("delete/{id}")]
        public ActionResult eliminar(int id)
        {
            SqlConnection conn = new SqlConnection("Data Source=DESKTOP-GN1S5UA\\SERVER;Initial Catalog=Employee;Integrated Security=SSPI");
            conn.Open();
            SqlCommand command = new SqlCommand("DELETE FROM perfil WHERE ID=@ID", conn);
            command.Parameters.AddWithValue("@ID", id);
            command.ExecuteNonQuery();
            return Ok();

        }

        [HttpPost("updateuser")]
        public ActionResult updateuser([FromBody] angular.api.Models.UserViewModel users)
        {
            SqlConnection conn = new SqlConnection("Data Source=DESKTOP-GN1S5UA\\SERVER;Initial Catalog=Employee;Integrated Security=SSPI");
            conn.Open();
            SqlCommand command = new SqlCommand("UPDATE perfil  SET firstname = @firstname, lastname =@lastname, password = @password, passwordrepeat = @passwordrepeat, postcode = @postcode, emailrepeat = @email, email = @emailrepeat Where ID =@ID  ", conn);
            command.Parameters.AddWithValue("@ID", users.Id);
            command.Parameters.AddWithValue("@firstname", users.firstname);
            command.Parameters.AddWithValue("@lastname", users.lastname);
            command.Parameters.AddWithValue("@password", users.password);
            command.Parameters.AddWithValue("@passwordrepeat", users.passwordrepeat);
            command.Parameters.AddWithValue("@postcode", users.postcode);
            command.Parameters.AddWithValue("@email", users.Email);
            command.Parameters.AddWithValue("@emailrepeat", users.emailrepeat);
            command.ExecuteNonQuery();
            return Ok();

        }
    }
}