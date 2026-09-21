import {BooksProvider} from './BooksContext';
import {MembersProvider} from './MembersContext';
import {BorrowedBooksProvider} from './BorrowedBooksContext';
import {InterestedBooksProvider} from './InterestedBooksContext';
import {AuthProvider} from './AuthContext';
import { NoticeProvider } from './NoticeContext';
import { ComplaintProvider } from './ComplaintContext';


export function AppProviders({children}){
    return(
        <AuthProvider>
            <BooksProvider>
                <MembersProvider>
                    <BorrowedBooksProvider>
                        <InterestedBooksProvider>
                            <NoticeProvider>
                                <ComplaintProvider>
                                    {children}
                                </ComplaintProvider>
                            </NoticeProvider>
                        </InterestedBooksProvider>
                    </BorrowedBooksProvider>
                </MembersProvider>
            </BooksProvider>
        </AuthProvider>
    );
}