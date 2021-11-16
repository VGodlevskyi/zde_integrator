CREATE TABLE user([id] int,
    [firstName] varchar(255),
    [lastName] varchar(255),
    [email] varchar(255),
    [cultureID] int,
    [deleted] bit,
    [country] varchar(255),
    [isRevokeAccess] bit,
    [created] datetime
);
INSERT INTO user(id,firstName,lastName,email,cultureID,deleted,country,isRevokeAccess,created) VALUES(1, 'Victor', 'Shevchenko', 'vs@ gmail.com', 1033, 1, 'US', 0, '2011-04-05'),
                                                                                                     (2, 'Alexander', 'Petrenko', 'ap@ gmail.com', 1034, 0, 'UA', 0, '2014-05-01'),
                                                                                                     (3, 'Victor', 'Tarasenko', 'vu@gmail.com', 1033, 1, 'US', 1, '2015-07-03'),
                                                                                                     (4, 'Sergey', 'Ivanenko', 'sergey@gmail.com', 1046, 0, 'UA', 1, '2010-02-02'),
                                                                                                     (5, 'Vitalii', 'Danilchenko', 'shumko@ gmail.com', 1031, 0, 'UA', 1, '2014-05-01'),
                                                                                                     (6, 'Joe', 'Dou', 'joe@ gmail.com', 1032, 0, 'US', 1, '2009-01-01'),
                                                                                                     (7, 'Marko', 'Polo', 'marko@gmail.com', 1033, 1, 'UA', 1, '2015-07-03')
CREATE TABLE [group]([id] int,
    [name] varchar(255),
    [created] datetime);
INSERT INTO [group](id,name,created) VALUES (10, 'Support', '2010-02-02'),
                                          (12, 'Dev team', '2010-02-03'),
                                          (13, 'Apps team', '2011-05-06'),
                                          (14, 'TEST - dev team', '2013-05-06'),
                                          (15, 'Guest', '2014-02-02'),
                                          (16, 'TEST-QA-team', '2014-02-02'),
                                          (17, 'TEST-team', '2011-01-07');
CREATE TABLE groupMembership(
    [id] int,
    [userID] int,
    [groupID] int,
    [created] datetime);

SELECT name FROM [group] WHERE [group].id NOT IN (SELECT groupId FROM groupMembership) AND  [group].name LIKE "TEST%";

SELECT firstName, lastName
FROM [user] WHERE [user].id IN
    (SELECT userId FROM groupMembership WHERE groupId NOT IN
    (SELECT [group].id FROM [group] WHERE [group].name LIKE "TEST%"));

SELECT firstName, lastName
FROM [user] WHERE [user].firstName="Victor" AND [user].id NOT IN
                (SELECT userId FROM groupMembership WHERE groupId IN
                (SELECT [group].id FROM [group] WHERE [group].name LIKE "TEST%"));

SELECT user.lastName, [group].name
FROM  groupMembership
    JOIN user ON user.id=groupMembership.userID
    JOIN [group] ON [group].id=groupMembership.groupID
WHERE user.created<[group].created
ORDER BY user.lastName