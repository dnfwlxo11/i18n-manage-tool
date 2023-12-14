import { google } from 'googleapis'

async function connGoogleApis() {
  const auth = new google.auth.JWT(
    "id-95-807@southern-frame-408100.iam.gserviceaccount.com",
    null,
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0lSMgzQ/eZ2o8\nypQ928PtHydZkJIUSaWUBBYcmMeKn9TgvrxoG9Tv5gh0cqI8BuukOlpmNQFyjeKn\nLJMhXQhXaiFlNTi4mkFdHqoRmXF/dcHMAnvSBcTxADIAGPE8cgzTKB5jyDT+zBHQ\nvaQXvZim9NASNqjDMpaEGPO/xT4imXVcRh6OJbL4QBE2DamZJyr63WSJMpZnoNDN\nHkVD4E2OpnCH4OAZFLzqoi6Jm83nxsbOogSu11Z8HPHweGH4+wgBd8bZhK3Z0cid\nnO9tVe23j5V7PNqLkPZqudrTDAJd7N2xZx4IRXxqpTD27gdz/aj1JaxWc9WD6tiD\n3dR7BhJhAgMBAAECggEABwxPGCCIzT6gRlEjIvIMj+5drrJy0SOrnDDF+Qze0Vfy\n/L24mecu2hlEOTZnvChDNm59gd4qMi/Ym5fBOzlZjo0zi12WvplQdci/YlCv2lsj\n6OW6JB9aMIx/SqZZPAXxwmufNrEeD4J58qRLULlzV3qfS+3MqDYnXKdpjPUg19Jb\nHrAxNNrtLF91lGjM7PDZUJLQ335J4rTVl397AnwWALXqw4zAtpHpnh7Tpw47/7w1\nm3D3YT8wGOW/ZsR8I5OA18skBWYUnl+OLUf7D6Rwdzjl3LR6og85sUq68GERUdXj\nzH5jSZXeWvM3RTwzSOyCWWW+5um1JJe1ICOaUjb+5QKBgQDl+EOC4jg68rRhjQcK\ngHKCTuN4FLhWmGsp0E3SlvZJjkvwqRf6NWSPPFjx9yK7I/WyM892GS3SYHljEPqg\n8jBtlQ9sv+FMTxh69PgkW5PymNsEvcvLj4UZNI8OMYmlce4AT+05ieuh67S/EoPu\nV4V4vrr6OMAcZjpWdMRHRMnugwKBgQDJBc0hTJ0OI0Mvykgs5RXvjf54vWCGAyLO\nk2uMHGsyFPqBl3aSCyWlO01oPf4LTmYod5pOZjXxH2bmgT9Bmq63UU8jepumk15+\n5LuqsQRNd1S47IkFs2lmPVHXft5viSjnFXBwok86e2bDzbce51AbEjX0pkPKuQKj\nJWPJ/cdmSwKBgDKnCx+x+hapzKdL68gZYJ9pBts1HSEds0Tjd7CxxY+QAxP/+qMG\nzZ5q+WBaQdEca4qTtNdbVmdnDnWOkNWQYrBQS7R1Uwd+yHKUsG85qI2fs2YI8/Fj\nLDrQA85phNrnDDgPYr3wrfDdPNN1HZAKwQBGamKgy1e2AJV4ZJ8Z/KxHAoGBAKfI\nO8pLU9r0+6LrxwoRuxlS/s5v4hx4iZi52s36+k22zM9VSBXlT+p1cMpM07lEGmg0\nS4qcLPGwMAa8Ybu0C5feOZt3PmruHbTz3N8/GERAEWq3ojYr5RD8pU6kCaw2Yvld\nH5gjINXDIabUEL+ueWHe9UHZdEPD37uj/YIeW0u5AoGBALosGyB15JxxQ4fZZ2Zt\nIPapsHv39tGkgsEqJS+mF2ES8BUA0H8eQ+CYmdn0+/hmqv3mWbXn2NlzhKpFE2dz\n89FUu/R7fYPPEfwcn8p5a/pNrU9t4J3yelhBCAcLTOrl/3Suukp0+9yE0jUvTmaw\nVyMI0QbxK21Q70mroUxltPTQ\n-----END PRIVATE KEY-----\n"
    [ 'https://www.googleapis.com/auth/spreadsheets' ]
  )

  const googleSheet = google.sheets({
    version: "v4",
    auth: auth
  })

  const content = googleSheet.spreadsheets.values

  return content
}
