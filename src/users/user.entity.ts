import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "../posts/post.entity";
import { Profile } from "../profiles/profile.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
       type : 'varchar',
       length: 96,
       nullable:false
    })
    firstName: string;

    @Column({
        type : 'varchar',
        length: 96,
        nullable: true
     })
    lastName: string;

    @Column({
        type : 'varchar',
        length: 96,
        unique : true,
        nullable:false
     })
    email: string;

    @Column({
        type : 'varchar',
        length: 96,
        nullable:true
     })
    @Exclude()
    password?: string;


    @Column({
        type : 'varchar',

        nullable:true
     })
    @Exclude()
    googleId?: string;

    @OneToMany(() => PostEntity, (post) => post.author)
    posts: PostEntity[];

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;

}