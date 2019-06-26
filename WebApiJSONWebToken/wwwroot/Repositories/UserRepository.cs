using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApiJSONWebToken.Models;

namespace WebApiJSONWebToken.DAL
{
    public class UserRepository
    {
        private IConfiguration _configuration;
        public UserRepository(IConfiguration configuration) => _configuration = configuration;

        public User Login(string username, string password)
        {
            using (SqlConnection conn = new SqlConnection(
                _configuration.GetConnectionString("WebApiJWT")))
            {
                var qry = "SELECT * FROM Users WHERE Username = @usr AND Password = @pwd AND Status = 1";
                return conn.QueryFirstOrDefault<User>(qry , new { usr = username, pwd = password });
            }
        }
        public User insert(string firstname, string lastname, string password, string passwordrepeat, string postcode, string Email, string emailrepeat)
        {
            using (SqlConnection conn = new SqlConnection(
                _configuration.GetConnectionString("WebApiJWT")))
            {
                var qry = "INSERT INTO perfil ([firstname],[lastname],[password],[passwordrepeat],[postcode],[emailrepeat],[email]) VALUES('" + firstname + "','" + lastname + "','" + password + "','" + passwordrepeat + "','" + postcode + "','" + emailrepeat + "','" + Email + "')";
                return conn.QueryFirstOrDefault<User>(qry, new { emailrepeat= emailrepeat, email= Email, firstname= firstname, lastname= lastname, password= password, passwordrepeat= passwordrepeat, postcode= postcode });
            }
        }
        public angular.api.Models.UserViewModel traertodo()
        {
            using (SqlConnection conn = new SqlConnection(
                _configuration.GetConnectionString("WebApiJWT")))
            {
                var qry = "Select * From perfil FOR JSON AUTO";
                return conn.QueryFirstOrDefault<angular.api.Models.UserViewModel>(qry);
            }
        }
    }
}
