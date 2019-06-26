using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.api.Models
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string Email { get; set; }
        public string emailrepeat { get; set; }
        public string password { get; set; }

        public string passwordrepeat { get; set; }
        public string postcode { get; set; }

        //    public List<ContentModel> Telefonos { get; set; }
    }

    //public class ContentModel
    //{
    //    public string Telefono { get; set; }
    //}




}
